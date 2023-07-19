import React, {Component} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "../pages/login";
import Register from "../pages/register";
import Homepage from "../pages/homepage";
import Admin from "../pages/admin";
import AdminHub from "../pages/adminhub";
import Account from "../pages/account";
import Stats from "../pages/stats";
import Friends from "../pages/friends";

import { withTranslation } from "react-i18next";


class OurRoutes extends Component{

    render() {
        const {t} = this.props
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={(props) => <Login t={t} />}></Route>
                    <Route exact path="/register" Component={(props)=> <Register t={t}/>}></Route>
                    <Route exact path ="homepage" Component={(props)=> <Homepage t={t}/>}></Route>
                    <Route exact path = "/account" Component={(props)=> <Account t={t}/>}></Route>
                    <Route exact path ="/admin" Component={(props)=> <Admin t={t}/>}></Route>
                    <Route exact path ="/adminpage" Component={(props) => <AdminHub t={t}/>}></Route>
                    <Route exact path ="/stats" Component={(props)=> <Stats t={t}/>}></Route>
                    <Route exact path ="/friends" Component={(props)=><Friends t={t}/>}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default withTranslation()(OurRoutes);