import styled from 'styled-components';

export default function WeekDays({background, textColor, dayText, onClick}){
    return(
        <Day background={background} textColor={textColor} onClick={onClick}>
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