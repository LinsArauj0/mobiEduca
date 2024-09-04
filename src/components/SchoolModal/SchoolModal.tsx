import React, { useState } from 'react';
import { addSchool } from '@/services/schoolService';
import './SchooModal.css';

interface SchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SchoolModal: React.FC<SchoolModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [nome, setNome] = useState('');
    const [cidade_id, setCidadeId] = useState<number | null>(null);
    const [diretor, setDiretor] = useState('');
    const [localizacao, setLocalizacao] = useState<string>('');
    const [turnos, setTurnos] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleShiftChange = (turno: string) => {
        setTurnos((prevShifts) =>
            prevShifts.includes(turno)
                ? prevShifts.filter((s) => s !== turno)
                : [...prevShifts, turno]
        );
    };

    const handlerSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const newSchool = { nome, cidade_id, diretor, localizacao, turnos };

        try {
            await addSchool(newSchool);
            onClose();
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
                        <label>Cidade</label>
                        <input type="text" required
                            value={cidade_id || ''}
                            onChange={(e) => setCidadeId(Number(e.target.value))}
                        />
                    </div>
                    <div className="form-group">
                        <label>Localização da Escola</label>
                        <select required
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                        >
                            <option value="Urbana">Urbana</option>
                            <option value="Rural">Rural</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Turnos</label>
                        <div className="checkbox-group">
                            <label><input type="checkbox" value="Manha" checked={turnos.includes('M')} onChange={() => handleShiftChange('M')} /> Manhã</label>
                            <label><input type="checkbox" value="Tarde" checked={turnos.includes('T')} onChange={() => handleShiftChange('T')} /> Tarde</label>
                            <label><input type="checkbox" value="Noite" checked={turnos.includes('N')} onChange={() => handleShiftChange('N')} /> Noite</label>
                            <label><input type="checkbox" value="Integral" checked={turnos.includes('I')} onChange={() => handleShiftChange('I')} /> Integral</label>
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