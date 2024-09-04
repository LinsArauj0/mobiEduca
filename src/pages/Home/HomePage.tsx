import { useState, useEffect } from 'react';
import { SchoolModal } from '@/components/SchoolModal/SchoolModal';
import { fetchSchools, addSchool } from '@/services/schoolService';
import './Home.css';

interface School {
    id: number,
    nome: string,
    cidade_id: string,
    localizacao: string,
    turnos: string[]
}

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const loadSchools = async () => {
        setLoading(true);
        try {
            const data = await fetchSchools();
            setSchools(data);
        } catch (error) {
            setError('Erro ao carregar as escolas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            loadSchools();
        }
    }, []);

    const filteredSchools = schools.filter(schools => {
        const matchesName = schools.nome.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCity = cityFilter ? schools.cidade_id === cityFilter : true;
        return matchesName && matchesCity;
    });

    const handleAddSchool = async (newSchool: any) => {
        try {
            await addSchool(newSchool);
            await loadSchools();
            closeModal();
        } catch (error) {
            console.error('Erro ao adicionar escola', error);
        }
    }

    if (loading) return <p>carregando...</p>;
    if (error) return <p>{error}</p>

    return (
        <div className="school-list-container">
            <div className="header">
                <h1>Escolas</h1>
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="city-filter"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        >
                        <option value="">Filtrar por cidade</option>
                        <option value="SaoPaulo">São Paulo</option>
                        <option value="RioDeJaneiro">Rio de Janeiro</option>
                        {/* Adicione mais cidades */}
                    </select>
                    <button className="add-school-button" onClick={openModal}>Adicionar Escola</button>
                </div>
            </div>
            <div className="school-list">
                <ul className="school-card">
                    {filteredSchools.length > 0 ? filteredSchools.map((school) => (
                        <li key={school.id} >
                            <div>
                                <h2>{school.nome}</h2>
                                <p>Cidade: {school.cidade_id}</p>
                                <p>Localização: {school.localizacao} </p>
                            </div>
                            <button className="details-button">Ver detalhes</button>
                        </li>
                    )) : <p>Não tem escola cadastrada</p>}
                </ul>
            </div>
            <SchoolModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export { Home };
