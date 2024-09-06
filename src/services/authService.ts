import api from "./apiSchool";

export const login = async (credentials: any) => {
    try {
        const response = await api.post('api/login/run', credentials);
        const { token } = response.data;

        localStorage.setItem('authToken', token);

        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login', error)
        throw error;
    }
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken')
    return !!token; 
}

export const logout = () => {
    localStorage.removeItem('authToken')
}