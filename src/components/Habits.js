import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import UserContext from "../contexts/UserContext";
import WeekDays from "./WeekDays";
export default function Habits(){
    const [listOfHabits, setListOfHabits] = useState([]);
    const [isCardActive, setIsCardActive] = useState(true);
    const [habit, setHabit] = useState('');
    const {token} = useContext(UserContext);
    const [selectedDays, setSelectedDays] = useState([]);

    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(response => {
           // console.log(response);
            setListOfHabits(response.data);
        })
    }, [])

    function selectDay(index){
        const aux = [...selectedDays, index];
        setSelectedDays(aux);
    }



    function addNewHabit(event){
        event.preventDefault();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const habitBody = {
            name: habit,
            days: selectedDays
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habitBody, config);
       promise.then(response => {
           console.log(response.data);
           const aux = [...listOfHabits, response.data];
           setListOfHabits(aux);

       })
              .catch(error =>{
                  console.log(error);
              });
        
        setSelectedDays([]);
        setHabit("");

    }

    /*
    Object { id: 19784, name: "awad", days: (2) […] }
​
days: Array [ 0, 2 ]
​​
0: 0
​​
1: 2
​​
length: 2
​​
<prototype>: Array []
​
id: 19784
​
name: "awad"
    
    */
    return(
        <GenericHabitsScreen>
            <MyHabits>
                <div>
                    <p>Meus hábitos</p>
                    <AddButton onClick={() => setIsCardActive(true)}>+</AddButton>                  
                </div>
                {
                    isCardActive ? 
                    <HabitCard>
                            <input type="text" value={habit} placeholder="nome do hábito" onChange={(e) => setHabit(e.target.value)}/>
                            <DaysDiv>
                              {weekdays.map((day, index) => 
                              <WeekDays key={index}
                                        background={index % 2 === 1 ? "#CFCFCF" : "white"}
                                        textColor= {index % 2 === 0 ? "#CFCFCF" : "white"}
                                        dayText={day}

                                        onClick={() => selectDay(index)}
                               />)}  
                            </DaysDiv>
                            
                            <span>
                                <ActionButton background="transparent" textColor="#52B6FF">Cancelar</ActionButton>
                                <ActionButton background="#52B6FF" textColor="white" onClick={addNewHabit}>Salvar</ActionButton>
                            </span>
                    </HabitCard>
                    : null
                }
                {listOfHabits.length === 0 ? 
                    <h3>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </h3>
                    :
                listOfHabits.map((habit) => 
                    <HabitCard>
                        <h4>{habit.name}</h4>
                        <DaysDiv>
                            {habit.days.map((day) => <WeekDays dayText={day}/>)}
                        </DaysDiv>
                    </HabitCard>)    
                }  

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



`

const AddButton = styled.button`
    background: #52B6FF;
    border-radius: 5px;
    border: none;
    height: 35px;
    width: 40px;
    cursor: pointer;
    font-size: 30px;
    color: white;
`


const HabitCard = styled.div`
    width: 350px;

    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    position: relative;

    input{
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        width: 303px;
        height: 45px;
        margin-top: 20px;
    }

    span{
        display: flex;
        position: absolute;
        bottom: 15px;
        right: 16px;
    }

    h4{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        align-self: baseline;
        margin-left: 15px;
    }
`

const ActionButton = styled.button`
    width: 84px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.background};
    color: ${props => props.textColor};
    font-family: 'Lexend Deca';
    font-weight: 700;
    cursor: pointer;
`


const DaysDiv = styled.p`
        width: 300px;
        display: flex;
        margin-top: 8px;
        margin-bottom: 70px;

`