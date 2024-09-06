import { useState, useEffect } from 'react';
import { SchoolModal } from '@/components/SchoolModal/SchoolModal';
import { DetailsModal } from '@/components/DetailsModal/DetailsModal';
import { fetchSchools } from '@/services/schoolService';
import { fetchCities } from '@/services/cityService';
import { fetchStates } from '@/services/stateService';
import './ListSchool.css';

interface Turno {
    escola_id: number,
    turno_sigla: string,
    turno: string
}

interface School {
    cidade: {
        id: number,
        descricao: string,
        estado: {
            descricao: string,
            sigla: string
        }
    },
    id: number,
    nome: string,
    cidade_id: string,
    localizacao: string,
    descricao: string,
    diretor: string,
    zona: string,
    turnos: Turno[]
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

const ListSchool = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState<number | ''>('');
    const [stateFilter, setStateFilter] = useState<number | ''>('');
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const openDetailsModal = (school: School) => {
        setSelectedSchool(school);
        setIsDetailsModalOpen(true);
    };
    
    const closeDetailsModal = () => {
        setSelectedSchool(null);
        setIsDetailsModalOpen(false);
    };

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

    const loadStates = async () => {
        try {
            const statesData: State[] = await fetchStates();
            setStates(statesData);
        } catch (error) {
            setError('Erro ao carregar estados.');
        }
    };

    const loadCities = async (_stateFilter: number) => {
        try {
            const citiesData: City[] = await fetchCities(_stateFilter);
            setCities(citiesData.filter(city => city.estado_id === stateFilter));
        } catch (error) {
            setError('Erro ao carregar cidades.');
        }
    };

    const handleSchoolAdded = async () => {
        await loadSchools();
    };

    const handleSchoolUpdated = async () => {
        await loadSchools();
    };

    useEffect(() => {
        loadStates();
        loadSchools();
    }, []);

    useEffect(() => {
        if (stateFilter) {
            loadCities(stateFilter);
        } else {
            setCities([]);
            setCityFilter('');
        }
    }, [stateFilter]);

    const filteredSchools = schools.filter((school) => {
        const matchesName = school.nome.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCity = cityFilter ? school.cidade.id === cityFilter : true;
        const matchesState = stateFilter ? cities.some(city => city.id === school.cidade.id && city.estado_id === stateFilter) : true; 
        return matchesName && matchesCity && matchesState;
    });

    if (loading) return <p>carregando...</p>;
    if (error) return <p>{error}</p>

    return (
        <div className="school-list-container">
            <div className="header">
                <h1>Escolas</h1>
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Pesquisar escola"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="city-filter"
                        value={stateFilter}
                        onChange={(e) => setStateFilter(Number(e.target.value))}
                    >
                        <option value="">Selecione o estado</option>
                        {states.map((state) => (
                            <option key={state.id} value={state.id}>{state.descricao}</option>
                        ))}
                    </select>
                    <select
                        className="city-filter"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(Number(e.target.value))}
                        disabled={!stateFilter}
                    >
                        <option value="">Selecione a cidade</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>{city.descricao}</option>
                        ))}
                    </select>
                    <button className="add-school-button" onClick={openModal}>Adicionar Escola</button>
                </div>
            </div>
            <div className="school-list">
                <ul>
                    {filteredSchools.length > 0 ? filteredSchools.map((school) => (
                        <li key={school.id} className="school-card">
                            <div>
                                <p>Escola: {school.nome}</p>
                                <p>Diretor(a): {school.diretor} </p>
                                <p>Cidade: {school.cidade.descricao} - { school.cidade.estado.sigla}</p>
                            </div>
                            <button 
                                className="details-button" 
                                onClick={() => openDetailsModal(school)}>Ver detalhes
                            </button>
                        </li>
                    )) : <p>Não tem escola cadastrada</p>}
                </ul>
            </div>
            <SchoolModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    closeModal();
                    handleSchoolAdded();
                }} 
                onSchoolAdded={handleSchoolAdded}
            />
            <DetailsModal 
                isOpen={isDetailsModalOpen} 
                onClose={() => {
                    closeDetailsModal();
                    handleSchoolUpdated(); 
                }} 
                school={selectedSchool} 
                onSchoolUpdated={handleSchoolUpdated}
            />
        </div>
    );
}

export { ListSchool };
