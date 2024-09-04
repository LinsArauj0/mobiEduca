import { useState } from "react";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setError('');

        try {
            await login({ email, senha });
            navigate('/schoolList')
        } catch (err) {
            setError('E-mail e/ou senha inválidos.')
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Digite seu email" required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" placeholder="Digite sua senha" required
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    {error && <p className="error"> {error} </p>}
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export { Login }
