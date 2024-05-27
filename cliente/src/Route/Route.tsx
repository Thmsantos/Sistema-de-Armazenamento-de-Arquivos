import React from "react";
import { BrowserRouter, Route as BrowserRouterRoute, Routes } from "react-router-dom";
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import Sent from '../Pages/Sent/Sent';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <BrowserRouterRoute path="/Login" element={<Login />} />
                <BrowserRouterRoute path="/" element={<Register />} />
                <BrowserRouterRoute path="/Home" element={<Home />} />
                <BrowserRouterRoute path="/Sent" element={<Sent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;