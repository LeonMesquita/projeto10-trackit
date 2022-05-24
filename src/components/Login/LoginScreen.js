import styled from 'styled-components';
import { useState } from 'react';
import {Link} from 'react-router-dom';
export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submitLogin(event){
        event.preventDefault();
        console.log('submitado')
    }
    return(
        <MainLoginScreen>
            <img src='../assets/images/TrackIt.svg' alt=''/>
            <LoginForm onSubmit={submitLogin}>
                <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Entrar</button>
            </LoginForm>
            <Link to={`/cadastro`}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </MainLoginScreen>
    );
}

const MainLoginScreen = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    p{
        color: #52B6FF;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        margin-top: 25px;
    }


`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 55px;

    input{
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;

        ::placeholder{
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
            font-family: 'Lexend Deca';
        }
    }


    button{
        background: #52B6FF;
        border-radius: 4.63636px;
        width: 303px;
        height: 45px;
        border: none;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: white;
        cursor: pointer;
    }

`