import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from 'axios';
export default function History(){
    const {authorization} = useContext(UserContext);
    const [historyHabits, setHistoryHabits] = useState([]);
    useEffect(() =>{
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", authorization)
        promise.then(response => {
            setHistoryHabits(response.data);
            console.log(response.data);
        })
    }, []);
    return(
        <GenericHabitsScreen>
            <HistoryTitle>
                <p>Histórico</p>
                {historyHabits.length === 0 ?
                    <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
                :
                    <></>
                }
            </HistoryTitle>
        </GenericHabitsScreen>
    );
}


const HistoryTitle = styled.div`
    padding-top: 100px;
p{
    font-family: 'Lexend Deca',sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    margin-left: 20px;
    }

h1{
    font-family: 'Lexend Deca',sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    margin-left: 20px;
    margin-top: 17px;
}

`

