import { useState } from 'react';
import { SchoolModal } from '@/components/SchoolModal/SchoolModal';
import './Home.css';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const schools = [
        {
            name: "Escola Municipal de Ensino Fundamental",
            address: "Rua das Flores, 123 - Centro, São Paulo - SP",
        },
    ];

    return (
        <div className="school-list-container">
            <div className="header">
                <h1>Escolas</h1>
                <div className="search-filter">
                    <input type="text" placeholder="Pesquisar por nome" className="search-input" />
                    <select className="city-filter">
                        <option value="">Filtrar por cidade</option>
                        <option value="SaoPaulo">São Paulo</option>
                        <option value="RioDeJaneiro">Rio de Janeiro</option>
                        {/* Adicione mais cidades */}
                    </select>
                    <button className="add-school-button" onClick={openModal}>Adicionar Escola</button>
                </div>
            </div>
            <div className="school-list">
                {schools.map((school, index) => (
                    <div key={index} className="school-card">
                        <div>
                            <h2>{school.name}</h2>
                            <p>{school.address}</p>
                        </div>
                        <button className="details-button">Ver detalhes</button>
                    </div>
                ))}
            </div>
            <SchoolModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export { Home };
