import './App.css';
import bg_chev from "./resources/bg_chev.png";

import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar";
import HomePage from './components/home';
import ProfilePage from './components/profile';

import {LoginProvider} from "./context/login-context";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    return (
        <LoginProvider value={[isLoggedIn, setIsLoggedIn, user, setUser]}>
            <div className='grid bg-repeat ...' style={{backgroundImage: bg_chev}}>
                <Navbar/>
                <div className="absolute top-20 rounded-3xl shadow-2xl bg-gray-100 justify-self-center items-center w-5/6 py-6">
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route path="/profile/:id" element={<ProfilePage/>}/>
                    </Routes>
                </div>
            </div>
        </LoginProvider>
    );
};

export default App;
