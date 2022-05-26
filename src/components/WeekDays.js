import styled from 'styled-components';
import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
export default function WeekDays({dayText, onClick, index}){
    const [buttonColor, setButtonColor] = useState("white");
    const [textColor, setTextColor] = useState("#CFCFCF");
    const [isActive, setIsActive] = useState(false);

    const {selectedDays, setSelectedDays} = useContext(UserContext);

    function onClickButton(key){
        let cond = !isActive;
        setIsActive(!isActive);
        if (cond){
            setButtonColor("#CFCFCF");
            setTextColor("white");
            let aux = [...selectedDays, key];
            setSelectedDays(aux);
        }
            
        else{
            setButtonColor("white");
            setTextColor("#CFCFCF");
           let aux = selectedDays.filter(day => day !== key);
            setSelectedDays(aux);
        }
            
    }
    return(
        <Day background={buttonColor} textColor={textColor} onClick={() => onClickButton(index)}>
            <h5>{dayText}</h5>
        </Day>
    );
}


const Day = styled.button`
    background: ${props => props.background};
    color: ${props => props.textColor};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    font-family: 'Lexend Deca';
    cursor: pointer;
    margin-right: 4px;
`