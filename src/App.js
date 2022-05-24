import {BrowserRouter, Routes, Route} from "react-router-dom";
import Habits from "./components/Habits";
import History from "./components/History";
import LoginScreen from "./components/Login/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import Today from "./components/Today";
import './reset.css';
import { useState } from "react";
export default function App(){
    const [token, setToken] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen setToken={setToken}/>}/>
                <Route path="/cadastro" element={<RegisterScreen />}/>
                <Route path="/habitos" element={<Habits token={token}/>}/>
                <Route path="/hoje" element={<Today />}/>
                <Route path="/historico" element={<History />}/>

            </Routes>
        </BrowserRouter>
    );
}