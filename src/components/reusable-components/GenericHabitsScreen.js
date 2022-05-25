import styled from 'styled-components';

export default function GenericHabitsScreen(props){
    return(

        <MainHabitsScreen>
            <NavBar>
                <div>
                    <h2>Trackit</h2>
                    <img src='https://t.ctcdn.com.br/5XPASDBUosgmBv5Ptpxcd6eTJso=/512x288/smart/filters:format(webp)/i257652.jpeg' alt=''/>
                </div>
            </NavBar>
            {props.children}

            <Footer>
                <div>
                    <p>Hábitos</p>
                    <TodayStatus>
                        Hoje
                    </TodayStatus>
                    <p>Histórico</p>
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
        margin-top: 28px;
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

    color: white;
    font-size: 18px;
    
`