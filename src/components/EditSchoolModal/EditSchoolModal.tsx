import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { fetchSchoolDetails, updateSchool } from "@/services/schoolService";
import { fetchStates } from "@/services/stateService";
import { fetchCities } from "@/services/cityService";
import { Button } from "../ui/button";
import './EditSchoolModal.css';

interface EditSchoolModalProps {
    id: number;
    onClose: () => void;
    onUpdate: () => void;
}

const EditSchoolModal: React.FC<EditSchoolModalProps> = ({ id, onClose, onUpdate }) => {
    const [schoolData, setSchoolData] = useState({
        nome: '',
        diretor: '',
        cidade_id: '',
        estado: '', 
        localizacao: '',
        turnos: [] as string[]
    });

    const [states, setStates] = useState<{ id: number, descricao: string }[]>([]);
    const [cities, setCities] = useState<{ id: number, descricao: string }[]>([]);
    const [availableTurns] = useState<{ label: string, value: string }[]>([
        { label: 'Manhã', value: 'M' },
        { label: 'Tarde', value: 'T' },
        { label: 'Noite', value: 'N' },
        { label: 'Integral', value: 'I' }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadSchoolDetails = async () => {
            try {
                const data = await fetchSchoolDetails(id);
                setSchoolData(data);
            } catch (error) {
                console.error('Erro ao carregar detalhes da escola', error);
            }
        };

        const loadStates = async () => {
            try {
                const statesData = await fetchStates();
                setStates(statesData);
            } catch (error) {
                console.error('Erro ao carregar estados', error);
            }
        };

        loadSchoolDetails();
        loadStates();
    }, [id]);

    useEffect(() => {
        const loadCities = async () => {
            if (schoolData.estado) {
                try {
                    const citiesData = await fetchCities(Number(schoolData.estado)); 
                    setCities(citiesData);
                } catch (error) {
                    console.error('Erro ao carregar cidades', error);
                }
            } else {
                setCities([]);
            }
        };
        loadCities();
    }, [schoolData.estado]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const validTurnos = schoolData.turnos.filter(turno => ['M', 'T', 'N', 'I'].includes(turno));
            
            await updateSchool(id, { ...schoolData, turnos: validTurnos });
            onUpdate(); 
            onClose(); 
        } catch (error) {
            console.error('Erro ao atualizar escola', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'estado') {
            setSchoolData(prevState => ({ ...prevState, [name]: value, cidade_id: '' }));
        } else {
            setSchoolData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleTurnoChange = (turno: string) => {
        setSchoolData(prevState => {
            const turnos = prevState.turnos.includes(turno)
                ? prevState.turnos.filter(t => t !== turno)
                : [...prevState.turnos, turno];
            return { ...prevState, turnos };
        });
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="dialog-content">
                <DialogTitle className="dialog-title">Editar Escola</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome da Escola</label>
                        <input
                            id="name"
                            name="nome"
                            type="text"
                            value={schoolData.nome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="director">Nome do Diretor</label>
                        <input
                            id="director"
                            name="diretor"
                            type="text"
                            value={schoolData.diretor}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado:</label>
                        <select
                            id="estado"
                            name="estado"
                            value={schoolData.estado}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um estado</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.id}> 
                                    {state.descricao}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade_id">Cidade:</label>
                        <select
                            id="cidade_id"
                            name="cidade_id"
                            value={schoolData.cidade_id}
                            onChange={handleInputChange}
                            required
                            disabled={!schoolData.estado}
                        >
                            <option value="">Selecione uma cidade</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.descricao}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Turnos:</label>
                        <div className="checkbox-group">
                            {availableTurns.map(turno => (
                                <div key={turno.value}>
                                    <label htmlFor={turno.value}>{turno.label}</label>
                                    <input
                                        type="checkbox"
                                        id={turno.value}
                                        name="turnos"
                                        value={turno.value}
                                        checked={schoolData.turnos.includes(turno.value)}
                                        onChange={() => handleTurnoChange(turno.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="dialog-footer">
                        <Button type="submit" className="button primary" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </Button>
                        <Button type="button" className="button secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export { EditSchoolModal }