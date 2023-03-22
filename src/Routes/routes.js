import React, {Component} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "../login";
import Register from "../Componentes/register";


class OurRoutes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={Login}></Route>
                    <Route exact path="/register" Component={Register}></Route>
                </Routes>
            </BrowserRouter>

        );
    }
}

export default OurRoutes;