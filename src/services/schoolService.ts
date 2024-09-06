import api from "./apiSchool";

export const fetchSchools = async () => {
    try {
        const response = await api.get(`api/escolas`);
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar escolas ', error);
        throw error;
    }
};

export const addSchool = async (schoolData: any) => {
    try {
        const response = await api.post('api/escolas', schoolData);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar escola', error)
        throw error;
    }
};

export const fetchSchoolDetails = async (id:number) => {
    try {
        const response = await api.get(`api/escolas/${id}`)
        return response.data;
    } catch (error){
        console.error('Erro ao atualizar escola.', error)
        throw error;
    }
}

export const updateSchool = async ( id:number, updatedData: { nome?: string; diretor?: string; cidade_id?: string; localizacao?: string; turnos?: string[] }) => {
    try {
        const response = await api.patch(`api/escolas/${id}`, updatedData)
        return response.data;
    } catch (error){
        console.error('Erro ao atualizar escola.', error)
        throw error;
    }
}