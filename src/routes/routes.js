import React, {Component} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "../pages/login";
import Register from "../pages/register";
import homepage from "../pages/homepage";
import readAndWrite from "../pages/readAndWrite";
import Admin from "../pages/admin";
import AdminHub from "../pages/adminhub";
import account from "../pages/account";
import Stats from "../pages/stats";
import Friends from "../pages/friends";


class OurRoutes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={Login}></Route>
                    <Route exact path="/register" Component={Register}></Route>
                    <Route exact path ="homepage" Component={homepage}></Route>
                    <Route exact path ="/readAndWrite" Component={readAndWrite}></Route>
                    <Route exact path = "/account" Component={account}></Route>
                    <Route exact path ="/admin" Component={Admin}></Route>
                    <Route exact path ="/adminpage" Component={AdminHub}></Route>
                    <Route exact path ="/stats" Component={Stats}></Route>
                    <Route exact path ="/friends" Component={Friends}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default OurRoutes;