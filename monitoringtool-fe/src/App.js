import { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NavBar from "./components/NavBar";
import Logout from "./pages/Logout/Logout";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import RequireAuth from "./components/RequireAuth";
import RegisterProject from "./pages/RegisterProject/RegisterProject";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";

function App({theme}) {
    const AuthenticatedProjectsPage = RequireAuth(ProjectsPage);
    return (
        <>
            
            <NavBar/>
            <Routes>
                    <Route path="/projects" element={<AuthenticatedProjectsPage />} />
                    <Route path="/" element={<AuthenticatedProjectsPage />} />

                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/login"} element={<Login theme={theme}/>}/>
                <Route path={"/logout"} element={<Logout/>}/>

                <Route path={"/access_denied"} exact element={<AccessDenied/>}/>
                <Route path={"/not_found"} exact element={<NotFound/>}/>
            </Routes>
        </>
    );
}
export default App;
