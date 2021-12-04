import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from "components/Navigation"
import Profile from 'routes/Profile';


const Routing = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ?
                    <>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/Profile' element={<Profile/>} />
                    {
                    /* //모든 URL이 '/'이 아니면 '/'로 돌아가라는 뜻 (React Redirect) 로그아웃 했을떄 로그인 화면으로 전환하기 위함
                    <Redirect form="*" to="/" /> */
                    // 이번엔 useNavigate 사용함
                    }
                    </>
                    :
                    <Route exact path='/' element={<Auth/>} />
                };
            </Routes>
        </Router>
    )
};

export default Routing;