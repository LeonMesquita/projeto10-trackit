import styled from 'styled-components';
import {Link, useSearchParams} from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useState } from 'react';
export default function GenericHabitsScreen(props){
    const {donePercent, setDonePercent, todayHabits, setTodayHabits, authorization, userPicture} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", authorization);
        let doneCount = 0;
        promise.then(response => {
            setTodayHabits(response.data);
            response.data.map((habit) => {if (habit.done) doneCount++});
            setDonePercent(doneCount);
            setIsLoading(false);
        })
    }, [])
    return(

       isLoading ? null : <MainHabitsScreen>
            <NavBar>
                <div>
                    <h2>Trackit</h2>
                    <img src={userPicture} alt=''/>
                </div>
            </NavBar>
            {props.children}

            <Footer>
                <div>
                    <Link to={"/habitos"}>
                        <p>Hábitos</p>
                    </Link>

                    <Link to={"/hoje"}>
                        <TodayStatus>
                        <CircularProgressbar 
                            minValue={0}
                            maxValue={todayHabits.length}
                            value={donePercent} text={`Hoje`}
                            styles={buildStyles({
                            
                                pathColor: `white`,
                                textColor: 'white',
                                trailColor: 'transparent',
                                backgroundColor: '#3e98c7',
                            })}
                
                        />
                        </TodayStatus>
                    </Link>

                    <Link to={"/historico"}>
                        <p>Histórico</p>
                    </Link>
                    

                    
                </div>
            </Footer>



        </MainHabitsScreen>
    )
}


const MainHabitsScreen = styled.div`


    background: #E5E5E5;
    min-height: 100vh;
    position: relative;
    margin: auto;
    padding-bottom: 150px;



    





    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`

const NavBar = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Recursive&family=Righteous&display=swap');

    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 70px;
    position: fixed;
    top: 0;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    z-index: 1;
    

    div{
        width: 375px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    h2{
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 49px;
        color: #ffffff;
        font-family: 'Playball', cursive;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }

`

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    min-width: 100vw;
    background-color: white;
    height: 70px;

    div{
        width: 375px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: auto;
        position: relative;
    }

    p{
        font-family: 'Lexend Deca',sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;

    }

    a{
        text-decoration: none;

    }

`

const TodayStatus = styled.span`
    width: 100px;
    height: 100px;
    background: #52B6FF;
    bottom: 10px;
    left: 37%;
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;

    color: white;
    font-size: 18px;
    font-weight: 700;
    
`