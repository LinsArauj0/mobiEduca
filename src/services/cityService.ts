import api from "./apiSchool";

export const fetchCities = async (id: number) => {
    try {
        const response = await api.get(`api/cidades?estado_id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar cidades ', error);
        throw error;
    }
};