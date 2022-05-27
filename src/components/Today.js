import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import { useState } from "react";

//import dayjs from 'dayjs'
export default function Today(){
    const {listOfHabits, setListOfHabits, token, donePercent, setDonePercent, todayHabits} = useContext(UserContext);
    
    
    
   // const dayjs = require('dayjs');
   // const today = dayjs().format();

    return(
        <GenericHabitsScreen>
            <TodayCompleted>
                <p>Segunda, 17/05</p>
                <h2>Nenhum hábito concluído ainda</h2>
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

    span{
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