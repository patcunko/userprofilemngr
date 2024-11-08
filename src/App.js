import './App.css';
import bg_chev from "./resources/chevron-up-trail-small.svg";

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
            <div className='bg-repeat-round' style={{backgroundSize: 800, backgroundImage: `url(${bg_chev})`}}>
                <div className='h-screen backdrop-blur-xl'>
                    <Navbar/>
                    <div className='absolute top-20 w-full grid backdrop-blur-xl'>
                        <div className="rounded-3xl shadow-2xl w-5/6 bg-gray-100 justify-self-center items-center py-6">
                            <Routes>
                                <Route exact path="/" element={<HomePage/>}/>
                                <Route path="/profile/:id" element={<ProfilePage/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </LoginProvider>
    );
};

export default App;