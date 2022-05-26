import styled from 'styled-components';


export default function ConfirmationDialog({message, onclickYes, onclickNo}){
    return(
        <Dialog>
            <div>
                <h3>{message}</h3>
            <span>
                <button onClick={onclickYes}>Sim</button>
                <button onClick={onclickNo}>Não</button>

            </span>

            </div>

        </Dialog>
    );
}


const Dialog = styled.div`
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
        justify-content: space-between;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        width: 300px;
        height: 200px;
        border-radius: 20px;

    }

    span{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        margin-bottom: 20px;

    }

    button{
        width: 90px;
        height: 30px;
        background-color: #52B6FF;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: white;
        font-weight: 700;
    }

    h3{
        text-align: center;
        margin-top: 50px;
        font-family: 'Roboto',sans-serif;
        font-weight: normal;
    }

`