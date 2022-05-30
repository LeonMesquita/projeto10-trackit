import { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import GenericLoginScreen from '../reusable-components/GenericLoginScreen';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import LoaderSpinner from '../reusable-components/LoaderSpinner';
export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setToken, setUserPicture} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputBackground, setInputBackground] = useState("#fffff");
    const [opacity, setOpacity] = useState(1);

    const StorageUser= JSON.parse(localStorage.getItem("user"));
    if (StorageUser){
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", StorageUser);
        promise.then(response => {
            setToken(response.data.token);
            setUserPicture(response.data.image);
            navigate('/hoje', { replace: true });
        });
    }


    function submitLogin(event){
        event.preventDefault();
        setIsLoading(true);
        setIsDisabled(true);
        setInputBackground("#F2F2F2");
        setOpacity(0.7);

        const body = 
        {
            email,
            password
        }

       

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);

        promise.then(response => {
            setToken(response.data.token);
            setUserPicture(response.data.image);
            const convertedBody = JSON.stringify(body);
            localStorage.setItem("user", convertedBody);
            navigate('/hoje', { replace: true });
        })
               .catch(() => {
                    setIsLoading(false);
                    setIsDisabled(false);
                    setInputBackground("white");
                    setOpacity(1);
                    alert("Login inválido, tente novamente.");
               })
        
    }

    function onLoading(event){
        event.preventDefault();

    }
    return(
        !StorageUser ?
            <GenericLoginScreen buttonOpacity={opacity} inputBackground={inputBackground}>
            <form onSubmit={isLoading ? onLoading : submitLogin}>
                <input disabled={isDisabled} type="email" placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input disabled={isDisabled} type="password" placeholder='senha' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isDisabled}>{isLoading ?
                            <LoaderSpinner />
                : "Entrar"}</button>
            </form>
            <Link to={`/cadastro`}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </GenericLoginScreen>
        :
        <LoaderSpinner />
    

    );
}
