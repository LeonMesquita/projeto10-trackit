import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import GenericLoginScreen from './reusable-components/GenericLoginScreen';
import axios from 'axios';

export default function RegisterScreen(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');

    function submitRegister(event){
        event.preventDefault();

        const body = {
            email,
            name,
            image: photo,
            password
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
        promise.then(response => {
            navigate('/', { replace: true });
        })
               .catch(error => {
                   console.log(error);
               })
    }
    return(
        <GenericLoginScreen>
            <form onSubmit={submitRegister}>
                <input type="email" placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='senha' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder='nome' required value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder='foto' required value={photo} onChange={(e) => setPhoto(e.target.value)} />
                <button>Cadastrar</button>
            </form>
            <Link to={`/`}>
                <p>Já tem uma conta? faça login</p>
            </Link>
        </GenericLoginScreen>
    );
}