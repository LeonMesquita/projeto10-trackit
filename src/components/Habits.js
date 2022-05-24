import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import axios from 'axios';
export default function Habits({token}){
    const [listOfHabits, setListOfHabits] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(response => {
            console.log(response);
            setListOfHabits(response.data);
        })
    }, [])

    console.log(token);
    return(
        <GenericHabitsScreen>
            <MyHabits>
                <div>
                    <p>Meus hábitos</p>
                    <button>+</button>                  
                </div>
                {listOfHabits.length === 0 ? 
                    <h3>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </h3>
                    :
                    null}  

            </MyHabits>
        </GenericHabitsScreen>
    );
}


const MyHabits = styled.div`
    padding-top: 100px;
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    font-family: 'Lexend Deca',sans-serif;

    div{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    p{

        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    button{
        background: #52B6FF;
        border-radius: 5px;
        border: none;
        height: 35px;
        width: 40px;
        cursor: pointer;

        font-size: 30px;
        color: white;
    }
`

