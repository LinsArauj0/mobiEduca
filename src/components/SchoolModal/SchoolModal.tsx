import React from 'react';
import './SchooModal.css';

interface SchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SchoolModal: React.FC<SchoolModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cadastrar Nova Escola</h2>
                <form>
                    <div className="form-group">
                        <label>Nome da Escola</label>
                        <input type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Nome do Diretor</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Cidade</label>
                        <input type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Localização da Escola</label>
                        <select required>
                            <option value="Urbana">Urbana</option>
                            <option value="Rural">Rural</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Turnos</label>
                        <div className="checkbox-group">
                            <label><input type="checkbox" value="Manha" /> Manhã</label>
                            <label><input type="checkbox" value="Tarde" /> Tarde</label>
                            <label><input type="checkbox" value="Noite" /> Noite</label>
                            <label><input type="checkbox" value="Integral" /> Integral</label>
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
