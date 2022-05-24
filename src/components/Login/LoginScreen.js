import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import GenericLoginScreen from '../reusable-components/GenericLoginScreen';
import axios from 'axios';
export default function LoginScreen({setToken}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function submitLogin(event){
        event.preventDefault();

        const body = 
        {
            email,
            password
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);

        promise.then(response => {
            setToken(response.data.token);
            navigate('/habitos', { replace: true });
        })
               .catch(error => {
                   console.log(error);
               })
        
    }
    return(
        <GenericLoginScreen>
            <form onSubmit={submitLogin}>
                <input type="email" placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='senha' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Entrar</button>
            </form>
            <Link to={`/cadastro`}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </GenericLoginScreen>
    );
}
