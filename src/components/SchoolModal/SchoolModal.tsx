import React, { useState, useEffect } from 'react';
import { addSchool } from '@/services/schoolService';
import { fetchCities } from '@/services/cityService';
import { fetchStates } from '@/services/stateService';
import './SchooModal.css';

interface SchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface State {
    id: number,
    sigla: string,
    descricao: string
}

interface City {
    id: number,
    estado_id: number,
    descricao: string,
    estado: string[]
}

const SchoolModal: React.FC<SchoolModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [nome, setNome] = useState('');
    const [cidade_id, setCidadeId] = useState<number | null>(null);
    const [cidades, setCidades] = useState<City[]>([]);
    const [estados, setEstados] = useState<State[]>([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState<number | null>(null);
    const [diretor, setDiretor] = useState('');
    const [localizacao, setLocalizacao] = useState<number | null>(null);
    const [turnos, setTurnos] = useState<string[]>([]);
    const [, setError] = useState<string | null>(null);

    const handleShiftChange = (turno: string) => {
        setTurnos((prevShifts) =>
            prevShifts.includes(turno)
                ? prevShifts.filter((s) => s !== turno)
                : [...prevShifts, turno]
        );
    };

    useEffect(() => {
        const loadStates = async () => {

            try {
                const statesData: State[] = await fetchStates();
                setEstados(statesData);
            } catch (error) {
                console.error("Erro ao carregar estados.", error)
            }
        }
        loadStates();
    }, [])

    useEffect(() => {
        if (estadoSelecionado) {
            const loadCity = async () => {
                try {
                    const cityData: City[] = await fetchCities(estadoSelecionado);
                    setCidades(cityData);
                } catch (error) {
                    console.error("Erro ao carregar cidades.", error);
                }
            }
            loadCity();
        } else {
            setCidades([]);
        }
    }, [estadoSelecionado]);

    const handlerSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const newSchool = {
            nome,
            cidade_id,
            diretor,
            localizacao,
            turnos,
        };

        try {
            const response = await addSchool(newSchool);
            console.log(response)
            onClose();
            handleSchoolAdded();
        } catch (error) {
            setError('Erro ao adicionar escola, Tente novamente');
        }

    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cadastrar Nova Escola</h2>
                <form onSubmit={handlerSubmit}>
                    <div className="form-group">
                        <label>Nome da Escola</label>
                        <input type="text" required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nome do Diretor</label>
                        <input type="text"
                            value={diretor}
                            onChange={(e) => setDiretor(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <select required
                            onChange={(e) => setEstadoSelecionado(Number(e.target.value))}
                        >
                            <option value="">Escolha uma opção</option>
                            {estados && estados.map((state) => (
                                <option key={state.id} value={state.id}>{state.descricao}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Cidade</label>
                        <select required
                            value={cidade_id || ""}
                            onChange={(e) => setCidadeId(Number(e.target.value))}
                            disabled={!estadoSelecionado}
                        >
                            <option value="">Escolha uma opção</option>
                            {cidades.map((city) => (
                                <option key={city.id} value={city.id}>{city.descricao}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Localização da Escola</label>
                        <select required
                            value={localizacao || ""}
                            onChange={(e) => setLocalizacao(Number(e.target.value))}
                        >
                            <option value="opcoes">Escolha uma opção</option>
                            <option value="1">Urbana</option>
                            <option value="2">Rural</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Turnos</label>
                        <div className="checkbox-group">
                            <div>
                                <label htmlFor='manha'>Manhã</label>
                                <input id="manha" type="checkbox" value="M" checked={turnos.includes('M')} onChange={() => handleShiftChange('M')} />
                            </div>
                            <div>
                                <label htmlFor='tarde'>Tarde</label>
                                <input id="tarde" type="checkbox" value="T" checked={turnos.includes('T')} onChange={() => handleShiftChange('T')} />
                            </div>
                            <div>
                                <label htmlFor='noite'>Noite</label>
                                <input id='noite' type="checkbox" value="N" checked={turnos.includes('N')} onChange={() => handleShiftChange('N')} />
                            </div>
                            <div>
                                <label htmlFor='integral'>Integral</label>
                                <input id='integral' type="checkbox" value="I" checked={turnos.includes('I')} onChange={() => handleShiftChange('I')} />
                            </div>

                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">Salvar</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { SchoolModal };

function handleSchoolAdded() {
    throw new Error('Function not implemented.');
}
