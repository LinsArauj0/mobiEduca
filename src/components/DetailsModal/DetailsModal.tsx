import React from 'react';
import './DetailsModal.css';

interface Turno {
    escola_id: number;
    turno_sigla: string;
    turno: string;
}

interface School {
    cidade: {
        id: number;
        descricao: string;
        estado: {
            descricao: string;
            sigla: string;
        };
    };
    id: number;
    nome: string;
    cidade_id: string;
    localizacao: string;
    descricao: string;
    diretor: string;
    zona: string;
    turnos: Turno[];
}

interface DetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    school: School | null;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, school }) => {
    if (!isOpen || !school) return null;

    return (
        <div className="details-modal-overlay">
            <div className="details-modal-content">
                <h2>Detalhes da Escola</h2>
                <p><strong>Nome:</strong> {school.nome}</p>
                <p><strong>Diretor(a):</strong> {school.diretor}</p>
                <p><strong>Cidade:</strong> {school.cidade.descricao} - {school.cidade.estado.sigla}</p>
                <p><strong>Localização:</strong> {school.zona}</p>
                <p><strong>Turnos:</strong> {school.turnos.map((t: { turno: any; }) => t.turno).join(', ')}</p>
                <button type='button' className='details-modal-edit-button' >Editar</button>
                <button onClick={onClose} className="details-modal-cancel-button">Fechar</button>
            </div>
        </div>
    );
}

export { DetailsModal };
