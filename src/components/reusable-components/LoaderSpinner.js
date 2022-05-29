import {ThreeDots, Oval } from  'react-loader-spinner'
import styled from 'styled-components';


export default function LoaderSpinner({loaderType}){
    return(
        !loaderType ?
        <ThreeDots 
            height="50"
            width="50"
            color='white'
            ariaLabel='loading'
            
        />
        :
        <Loader>
        <Oval 
        height="100"
        width="100"
        color='#00BFFF'
        secondaryColor='grey'
        ariaLabel='loading'
        />
        </Loader>
    

    );
}

const Loader = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
`