import { useState } from 'react';
import {Link} from 'react-router-dom';
import GenericLoginScreen from './reusable-components/GenericLoginScreen';

export default function RegisterScreen(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');

    function submitRegister(event){
        event.preventDefault();
    }
    return(
        <GenericLoginScreen>
            <img src='../assets/images/TrackIt.svg' alt=''/>
            <form onSubmit={submitRegister}>
                <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder='nome' value={email} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder='foto' value={password} onChange={(e) => setPhoto(e.target.value)} />
                <button>Cadastrar</button>
            </form>
            <Link to={`/`}>
                <p>Já tem uma conta? faça login</p>
            </Link>
        </GenericLoginScreen>
    );
}