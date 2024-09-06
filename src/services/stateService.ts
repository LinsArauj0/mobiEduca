import api from "./apiSchool";

export const fetchStates = async () => {
    try {
        const response = await api.get(`api/estados`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estado ', error);
        throw error;
    }
};