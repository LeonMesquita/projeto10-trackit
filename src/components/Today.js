import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import { useState } from "react";
export default function Today(){
    const {listOfHabits, setListOfHabits, token} = useContext(UserContext);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(response => {
            setListOfHabits(response.data);
        })
    }, []);

    return(
        <GenericHabitsScreen>
            <TodayCompleted>
                <p>Segunda, 17/05</p>
                <h2>Nenhum hábito concluído ainda</h2>
            </TodayCompleted>

            {listOfHabits.length === 0 ? 
                    null
                    :
                listOfHabits.map((habit) => 
                    <HabitStatusCard>
                        <p>
                            <h4>{habit.name}</h4>
                            <h5>Sequência atual: 3 dias</h5>
                            <h5> Seu recorde: 5 dias</h5>       
                       </p>

                       <CheckButton />
                        
                    </HabitStatusCard>    
                )    
                }  
            
        </GenericHabitsScreen>
    );
}


function CheckButton(){
    const [buttonColor, setButtonColor] = useState("#EBEBEB");
    const [itsDone, setItsDone] = useState(false);
    function clickButton(){
        let cond = !itsDone;
        setItsDone(cond);
        cond ? 
        setButtonColor("#8FC549")
        :
        setButtonColor("#EBEBEB");

    }
    return(
        <MarkHabit buttonColor={buttonColor} onClick={clickButton}>
            <img src="../assets/images/check.svg" alt=""/>
        </MarkHabit>
    );
}


const TodayCompleted = styled.div`
    margin: auto;
    padding-top: 100px;
    width: 375px;


    
    margin-bottom: 28px;
    

    p{
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    margin-left: 20px;

    
    
    }

    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 22px;
        color: #BABABA;
        margin-left: 20px;

    }
`

const HabitStatusCard = styled.div`
    width: 340px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin: auto;
    justify-content: space-between;
    margin-bottom: 10px;

    p{
        margin-left: 15px;
    }
`

const MarkHabit = styled.button`
    background: ${props => props.buttonColor};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    width: 69px;
    height: 69px;
    margin-right: 13px;
    margin-top: 13px;
    margin-bottom: 13px;
    cursor: pointer;
`