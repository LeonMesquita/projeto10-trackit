import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import { useState } from "react";
import dayjs from 'dayjs';
export default function Today(){
    const {donePercent, todayHabits} = useContext(UserContext);  
    const percent = calcPercent(donePercent, todayHabits.length);
    const dayjs = require('dayjs');
    const currentDay =returnDayOfWeek(dayjs().day());

    return(
        <GenericHabitsScreen>
            <TodayCompleted>
                <p>{currentDay}, {dayjs().date()}/{dayjs().month()}</p>
                {donePercent === 0 ?
                    <h2>Nenhum hábito concluído ainda</h2>
                :
                    <h3>{percent}% dos hábitos concluídos</h3>
                }
            </TodayCompleted>

            {todayHabits.length === 0 ? 
                    null
                    :
                    todayHabits.map((habit) => 
                    <HabitStatusCard>
                        <span>
                            <h4>{habit.name}</h4>
                            <h5>Sequência atual: {habit.currentSequence} dias</h5>
                            <h5> Seu recorde: {habit.highestSequence} dias</h5>       
                       </span>

                       <CheckButton done={habit.done} habitID={habit.id} key={habit.id}/>
                        
                    </HabitStatusCard>    
                )    
                }  
            
        </GenericHabitsScreen>
    );
}


function CheckButton({done, habitID}){
    const [buttonColor, setButtonColor] = useState(done ? "#8FC549" :"#EBEBEB");
    const [itsDone, setItsDone] = useState(done);
    const {authorization, donePercent, setDonePercent} = useContext(UserContext);
   

    function clickButton(){
        if (!itsDone){
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitID}/check`, null, authorization);
            promise.then(response => {
                setButtonColor("#8FC549");
                setItsDone(!itsDone);
                setDonePercent(donePercent+1);
            })
            .catch(error => {
                console.log(error);
            })
        }
        else{
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitID}/uncheck`, null, authorization);
           promise.then(response => {
               setButtonColor("#EBEBEB");
               setItsDone(!itsDone);
               setDonePercent(donePercent-1);
           });
        }     
     


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
        font-weight: 700;
        font-size: 17px;
        line-height: 22px;
        color: #BABABA;
        margin-left: 20px;

    }

    h3{
        font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #8FC549;
    margin-left: 20px;
    margin-top: 0px;

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

    span{
        margin-left: 15px;
    }

    h4{
        font-family: 'Lexend Deca',sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }

    h5{
        font-family: 'Lexend Deca',sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
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


function returnDayOfWeek(day){
    switch(day){
        case 0:
            return "Domingo"
        case 1:
            return "Segunda"
        case 2:
            return "Terça"
        case 3:
            return "Quarta"
        case 4:
            return "Quinta"
        case 5:
            return "Sexta"
        case 6:
            return "Sábado"
    }
}

function calcPercent(valor, total){
    const percent = (valor * 100)/total;
    return percent;
}