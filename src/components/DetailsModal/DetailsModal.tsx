import React, { useState } from 'react';
import './DetailsModal.css';
import { EditSchoolModal } from '@/components/EditSchoolModal/EditSchoolModal';

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
    onSchoolUpdated: () => void; 
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, school }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!isOpen || !school) return null;

    const handleEditClick = () => {
        setIsEditModalOpen(true); 
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false); 
    };

    const handleUpdate = () => {
        
        handleEditClose(); 
    };

    return (
        <>
            <div className="details-modal-overlay">
                <div className="details-modal-content">
                    <h2>Detalhes da Escola</h2>
                    <p><strong>Nome:</strong> {school.nome}</p>
                    <p><strong>Diretor(a):</strong> {school.diretor}</p>
                    <p><strong>Cidade:</strong> {school.cidade.descricao} - {school.cidade.estado.sigla}</p>
                    <p><strong>Localização:</strong> {school.zona}</p>
                    <p><strong>Turnos:</strong> {school.turnos.map((t: { turno: any; }) => t.turno).join(', ')}</p>
                    
                    <button 
                        type='button' 
                        className='details-modal-edit-button' 
                        onClick={handleEditClick} 
                    >
                        Editar
                    </button>
                    <button onClick={onClose} className="details-modal-cancel-button">Fechar</button>
                </div>
            </div>

            {isEditModalOpen && (
                <EditSchoolModal
                    id={school.id}
                    onClose={handleEditClose}
                    onUpdate={handleUpdate}
                />
            )}
        </>
    );
}

export { DetailsModal };
