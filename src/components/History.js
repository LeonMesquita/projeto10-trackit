import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import Calendar from 'react-calendar';
import dayjs from 'dayjs'
export default function History(){
    const dayjs = require('dayjs');
    const day = dayjs().format();
    const {authorization} = useContext(UserContext);
    const [historyHabits, setHistoryHabits] = useState([]);
    const [value, onChange] = useState(new Date());
    const [dailyHabits, setDailyHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() =>{
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", authorization)
        promise.then(response => {
            setHistoryHabits(response.data);
        })
    }, []);


    function formatDate(date, locale){
        //  console.log(date);
         // console.log(locale);
      }
      function clickDay(value){
        
        let selectedDay = dayjs(value).format('DD/MM/YYYY');
        selectedDay = selectedDay
        setIsLoading(true);
        setDailyHabits([]);
       

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", authorization);
        promise.then(
            response => {
                setDailyHabits(response.data.filter(habit => habit.day === selectedDay));
                
                setIsLoading(false);
            }
        )
      }
    return(
        <GenericHabitsScreen>    
                <Body>
                <p>Histórico</p>

                <CalendarDiv>
                <Calendar onChange={onChange}  value={value} locale={"pt-br"} onClickDay={	(value) => clickDay(value)}/>
                {console.log(value)}
            </CalendarDiv>            
                </Body>


            {isLoading ? null : <>
              {dailyHabits.length !== 0 ?
              <DailyHabits>
                    <div>
                    {
               
                     dailyHabits.map((day) => <>
                     <h3>Hábitos do dia {day.day}</h3>
                     {day.habits.map(habit => 
                      <span>
                      <h2>hábito: {habit.name}</h2>
                      <h2>status: {habit.done ? "concluído" : "não concluído"}</h2>
                     </span>)}
                    </>
                   
                    )
                   }
                    <button onClick={() => setIsLoading(true)}>sair</button>
                </div>
              </DailyHabits>
              : alert('Não existe nenhum hábito para este dia.')}
              
            </>}

        </GenericHabitsScreen>
    );
}





const DailyHabits = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        width: 360px;
        min-height: 200px;
        max-height: 600px;
        overflow-y: scroll; 
        border-radius: 20px;
        padding-left: 5px;
        padding-right: 5px;


   
    }

    span{
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: center;
        width: 100%;
        margin-top: 20px;
      border-radius: 5px;
        border: 1px solid grey;
        padding-top: 10px;
        padding-bottom: 10px;
       

    }

    button{
        width: 200px;
        height: 40px;
        background-color: #52B6FF;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: white;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 20px;
 

       
       
    }

    h3{
        text-align: center;
        margin-top: 20px;
        font-family: 'Lexend Deca',sans-serif;
        font-weight: normal;
        
    }

    h2{
      color: #666666;
      font-family: 'Lexend Deca',sans-serif;
      margin-left: 10px;
  

    }

`







const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 100px;
  width: 375px;

  p{
    font-family: 'Lexend Deca',sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
    margin-left: 10px;
    text-align: start;
    align-self: baseline;
    }
`






const CalendarDiv = styled.div`
  margin-top: 20px;
   .react-calendar {
  width: 350px;
  height: 402px;
  max-width: 100%;
  background: white;
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
}
.react-calendar--doubleView {
  width: 700px;
}
.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}
.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}
.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
  font-size: 17px;
  background: ${props => props.buttonColor};
  margin-top: 10px;
}
.react-calendar button:enabled:hover {
  cursor: pointer;
}
.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
}
.react-calendar__navigation button {
  min-width: 44px;
  background: none;
}
.react-calendar__navigation button:disabled {
  background-color: #f0f0f0;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #e6e6e6;
}
.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
}
.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
}
.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: bold;
}
.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}
.react-calendar__month-view__days__day--neighboringMonth {
  color: #757575;
}
.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}
.react-calendar__tile {
  max-width: 100%;
  padding: 10px 6.6667px;
  background: none;
  text-align: center;
  line-height: 16px;
}
.react-calendar__tile:disabled {
  background-color: #f0f0f0;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #e6e6e6;
}
.react-calendar__tile--now {
  background: #ffff76;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #ffffa9;
}
.react-calendar__tile--hasActive {
  background: #76baff;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #a9d4ff;
}
.react-calendar__tile--active {
  background: #006edc;
  color: white;
}
.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: #1087ff;
}
.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}

`