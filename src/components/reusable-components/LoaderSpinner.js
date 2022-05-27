import {ThreeDots } from  'react-loader-spinner'


export default function LoaderSpinner(){
    return(
        <ThreeDots 
            height="50"
            width="50"
            color='white'
            ariaLabel='loading'
        />
    );
}