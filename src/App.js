import {BrowserRouter, Routes, Route} from "react-router-dom";
import Habits from "./components/Habits";
import History from "./components/History";
import LoginScreen from "./components/Login/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import Today from "./components/Today";
import './reset.css';
import { useState } from "react";
import UserContext from "./contexts/UserContext";
export default function App(){
    const [token, setToken] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const [listOfHabits, setListOfHabits] = useState([]);

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return (
        <UserContext.Provider value={{token, setToken, listOfHabits, setListOfHabits, selectedDays, setSelectedDays, authorization}}>
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<RegisterScreen />}/>
                <Route path="/" element={<LoginScreen/>}/>
                <Route path="/habitos" element={<Habits />}/>
                <Route path="/hoje" element={<Today />}/>
                <Route path="/historico" element={<History />}/>
            </Routes>
        </BrowserRouter>

        </UserContext.Provider>

    );
}