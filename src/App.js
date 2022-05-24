import {BrowserRouter, Routes, Route} from "react-router-dom";
import Habits from "./components/Habits";
import History from "./components/History";
import LoginScreen from "./components/Login/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import Today from "./components/Today";
import './reset.css';

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />}/>
                <Route path="/cadastro" element={<RegisterScreen />}/>
                <Route path="/habitos" element={<Habits />}/>
                <Route path="/hoje" element={<Today />}/>
                <Route path="/historico" element={<History />}/>

            </Routes>
        </BrowserRouter>
    );
}