import { useState } from 'react';
import {Link} from 'react-router-dom';
import GenericLoginScreen from '../reusable-components/GenericLoginScreen';
export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submitLogin(event){
        event.preventDefault();
        console.log('submitado')
    }
    return(
        <GenericLoginScreen>
            <img src='../assets/images/TrackIt.svg' alt=''/>
            <form onSubmit={submitLogin}>
                <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Entrar</button>
            </form>
            <Link to={`/cadastro`}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </GenericLoginScreen>
    );
}
