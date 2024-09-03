import api from "./apiSchool";

export const fetchSchools = async () => {
    try {
        const response = await api.get('escolas');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar escolas ', error);
        throw error;
    }
};

export const addSchool = async (schoolData: any) => {
    try {
        const response = await api.post('/escolas', schoolData);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar escola', error)
        throw error;
    }
};