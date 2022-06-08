// import components
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Pages/Profile';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';

import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";

// import styles
import './styles/reset.css';
import './styles/fonts.css';
import './styles/variables.css';
import './styles/animations.css';
import './styles/style.css';
import Groups from './components/Pages/Groups';
import CreateGroup from './components/Pages/Groups/CreateGroup';
import MyGroups from './components/Pages/Groups/MyGroups';
import Group from './components/Pages/Groups/Group';

import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import io from "socket.io-client";

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [background, setBackground] = useState('bgTree');
    const [socket, setSocket] = useState(null);

    const joinRoom = () => {
        if (user) {
            console.log("joiningRoom")
            socket.emit("setup", user.id);
        }
    };

    useEffect(() => {
        setSocket(io('http://localhost:3001'));
      }, []);

    useEffect(() => {
        console.log(user)
        if (!socket) {
            return
        }
        if(user) {
            socket.emit("setup", user.id);
            console.log("Connecting to" + user.id)
        }
        socket.on("connected", () => console.log("connected"));
    }, [user?.id]);
    
    useEffect(() => {
        if(!socket) {
            return
        }
        console.log("recieving")
        socket.on("message recieved", (data) => {
            console.log("noti recieved" + data)
        });
    },[socket])
    

    const test = () => {
        console.log("hi")
        const message = "hellllllloooo"
        socket.emit("new notification", { message, receiver:2 });
    }

    const path = window.location.pathname;

    const handleBackgroundChange = () => {
        if (path === '/' || path === '/group' || path === '/mygroups' || path === '/creategroup') {
            setBackground('bgTree');
        } else if (path === '/login') {
            setBackground('bgCity');
        } else if (path === '/signup') {
            setBackground('bgSky');
        } else if (path === '/profile') {
            setBackground('bgGiant');
        };
    };

    const location = useLocation();

    useEffect(() => {
        handleBackgroundChange();
    }, [location]);

    let navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("foundArkJwt");
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    useEffect(() => {
        if (token) {
            setUser(jwtDecode(token))
        } else {
            setUser(null);
        }
    }, [token])

    const handleLoginSubmit = async (loginData) => {
        try {
            const res = await axios.post('https://found-ark-backend.herokuapp.com/api/users/login', {
                user_name: loginData.username,
                password: loginData.password,
            })
            if (res?.data?.token) {
                setToken(res.data.token)
                localStorage.setItem('foundArkJwt', res.data.token);
                navigate(`/`);
            }
        } catch (err) {
            alert(err?.response?.data?.msg)
            console.log(err);
        }
    }

    const handleSignupSubmit = async (signupData) => {
        try {
            const res = await axios.post('https://found-ark-backend.herokuapp.com/api/users/signup', {
                user_name: signupData.username,
                password: signupData.password,
                region: signupData.region,
                introduction: signupData.introduction,
            })
            if (res?.data?.token) {
                setToken(res.data.token)
                localStorage.setItem('foundArkJwt', res.data.token);
                navigate(`/profile`);
            }
        }
        catch (err) {
            alert("name taken")
            console.log(err);
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("foundArkJwt");
        navigate('/login')
    }

    return (
        <div className={"App " + background}>
            <Header user={user} logout={logout} test={test}/>
            <Routes>
                <Route path="/" element={<Groups user={user} />} />
                <Route path="creategroup" element={<CreateGroup user={user} />} />
                <Route path="mygroups" element={<MyGroups user={user} />} />
                <Route path="group/:groupId" element={<Group user={user} setBackground={setBackground} />} />
                <Route path="login" element={<Login handleLoginSubmit={handleLoginSubmit} />} />
                <Route path="signup" element={<SignUp handleSignupSubmit={handleSignupSubmit} />} />
                <Route path="profile" element={<Profile user={user}/>} />
            </Routes>
            <Footer />
        </div>

    );

};

export default App;
