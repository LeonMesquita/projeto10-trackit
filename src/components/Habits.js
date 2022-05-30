import GenericHabitsScreen from "./reusable-components/GenericHabitsScreen";
import styled from 'styled-components';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import UserContext from "../contexts/UserContext";
import WeekDays from "./WeekDays";
import ConfirmationDialog from "./reusable-components/ConfirmationDialog";
import LoaderSpinner from "./reusable-components/LoaderSpinner";
export default function Habits(){

    const [isCardActive, setIsCardActive] = useState(false);
    const [habit, setHabit] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputBackground, setInputBackground] = useState("#fffff");
    const [opacity, setOpacity] = useState(1);
    const {token, listOfHabits, setListOfHabits, selectedDays, setSelectedDays, authorization} = useContext(UserContext);

    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    useEffect(() => {
    
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", authorization);

        promise.then(response => {
            setListOfHabits(response.data);
        });
    }, []);


    function addNewHabit(event){
        event.preventDefault();
        setIsLoading(true);
        setIsDisabled(true);
        setInputBackground("#F2F2F2");
        setOpacity(0.7);


        const habitBody = {
            name: habit,
            days: selectedDays
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habitBody, authorization);
       promise.then(response => {
           const aux = [...listOfHabits, response.data];
           setListOfHabits(aux);
           setIsLoading(false);
           setIsDisabled(false);
           setInputBackground("white");
           setOpacity(1);
            setIsCardActive(false);
            
       })
              .catch(error =>{
                  console.log(error);
              });
        
        setSelectedDays([]);
        setHabit("");



    }

    function onclickDelete(habitID){
        setShowDialog(true);
        setSelectedToDelete(habitID);
    }


    function deleteHabit(){

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${selectedToDelete}`, config);

        promise.then(response => {
            const promise2 = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

            promise2.then(response => {
                setListOfHabits(response.data);
                setShowDialog(false);
                setSelectedToDelete(null);
            });
        })

        
    }

    return(
        <GenericHabitsScreen>
            <MyHabits>
                <MyHabitsDiv>
                    <p>Meus hábitos</p>
                    <AddButton onClick={() => setIsCardActive(true)}>+</AddButton>                  
                </MyHabitsDiv>
                {
                    isCardActive ? 
                    <HabitCard inputBackground={inputBackground}>
                            <input disabled={isDisabled} type="text" value={habit} placeholder="nome do hábito" onChange={(e) => setHabit(e.target.value)}/>
                            <DaysDiv>
                              {weekdays.map((day, index) => 
                              <WeekDays key={index}index={index}
                                        background={index % 2 === 1 ? "#CFCFCF" : "white"}
                                        textColor= {index % 2 === 0 ? "#CFCFCF" : "white"}
                                        dayText={day}
                                        isLoading={isLoading}
                               />)}  
                            </DaysDiv>
                            
                            <span>
                                <ActionButton onClick={() => setIsCardActive(false)} background="transparent" textColor="#52B6FF">Cancelar</ActionButton>
                                <ActionButton opacity={opacity} background="#52B6FF" textColor="white" onClick={addNewHabit}>{isLoading ? <LoaderSpinner /> : "Salvar"}</ActionButton>
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
                    <HabitCard top="10px">
                        <h4>{habit.name}</h4>
                        <DaysDiv align="baseline" bottom="15px">
                            {weekdays.map((day, index) => 
                                <ShowDays background={habit.days.includes(index)
                                ?
                                "#CFCFCF" : "white"}>{day}
                                </ShowDays>)}
                        </DaysDiv>
                        <DeleteButton onClick={() => onclickDelete(habit.id)}>
                            <ion-icon name="trash"></ion-icon>
                        </DeleteButton>
                    </HabitCard>)    
                }  

            </MyHabits>

            {showDialog ?
                <ConfirmationDialog message="Tem certeza de que deseja excluir o hábito?"
                    onclickYes={deleteHabit} onclickNo={() => setShowDialog(false)}/>
            : null}
        </GenericHabitsScreen>
    );
}


const MyHabits = styled.div`
    padding-top: 100px;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    font-family: 'Lexend Deca',sans-serif;
    



    p{

        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    @media(max-width: 375px) {
        width: 95%;
    }


`

const MyHabitsDiv = styled.div`

        display: flex;
        width: 100%;
        justify-content: space-between;
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
    margin-top: ${props => props.top ? props.top : "20px"};
    position: relative;

    input{
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        width: 303px;
        height: 45px;
        margin-top: 20px;
        align-self: baseline;
        margin-left: 20px;
        background-color: ${props => props.inputBackground};
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
        margin-top: 18px;
    }



    @media(max-width: 375px) {
        width: 95%;
        padding-left: 5px;
        padding-right: 5px;

        input{
            width: 90%;
        }
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
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.opacity};
    
`


const DaysDiv = styled.p`
        width: 300px;
        display: flex;
        margin-top: 8px;
        margin-bottom: ${props => props.bottom ? props.bottom : "70px"};
        align-self: baseline;
        margin-left: 20px;

`


const ShowDays = styled.div`
        background: ${props => props.background};
        color: ${props => props.background === "#CFCFCF" ? "white" : "#CFCFCF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        width: 30px;
        height: 30px;
        font-family: 'Lexend Deca';
        margin-right: 4px;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 20px;
        font-weight: 400;
`


const DeleteButton = styled.button`
    position: absolute;
    right: 10px;
    top: 11px;
    
    cursor: pointer;
    border: none;
    background-color: transparent;

    ion-icon{
        width: 17px;
        height: 17px;
        color: #666666;
        opacity: 0.5;
    }



`