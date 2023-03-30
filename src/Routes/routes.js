import React, {Component} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "../pages/login";
import Register from "../pages/register";
import homepage from "../pages/homepage";


class OurRoutes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={Login}></Route>
                    <Route exact path="/register" Component={Register}></Route>
                    <Route exact path ="homepage" Component={homepage}></Route>
                </Routes>
            </BrowserRouter>

        );
    }
}

export default OurRoutes;