import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import GenericLoginScreen from './reusable-components/GenericLoginScreen';
import axios from 'axios';
import LoaderSpinner from './reusable-components/LoaderSpinner';

export default function RegisterScreen(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputBackground, setInputBackground] = useState("#fffff");
    const [opacity, setOpacity] = useState(1);

    function submitRegister(event){
        event.preventDefault();
        setIsLoading(true);
        setIsDisabled(true);
        setInputBackground("#F2F2F2");
        setOpacity(0.7);

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
                    setIsLoading(false);
                    setIsDisabled(false);
                    setInputBackground("white");
                    setOpacity(1);
                    alert("Cadastro inválido, tente novamente.");

               })
    }
    return(
        <GenericLoginScreen buttonOpacity={opacity} inputBackground={inputBackground}>
            <form onSubmit={submitRegister}>
                <input disabled={isDisabled} type="email" placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input disabled={isDisabled} type="password" placeholder='senha' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <input disabled={isDisabled} type="text" placeholder='nome' required value={name} onChange={(e) => setName(e.target.value)}/>
                <input disabled={isDisabled} type="text" placeholder='foto' required value={photo} onChange={(e) => setPhoto(e.target.value)} />
                <button>{isLoading ? <LoaderSpinner /> : "Cadastrar"}</button>
            </form>
            <Link to={`/`}>
                <p>Já tem uma conta? faça login</p>
            </Link>
        </GenericLoginScreen>
    );
}

