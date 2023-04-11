import { Component } from "react";
import "../style/homepage.css"
import UserRequester from "../util/requester/userRequester";
import NavBar from "../components/navbar";
import { pageAuth } from "../util/pageAuth";


class homepage extends Component{

    constructor(props){
        super(props)

        this.handleAuth()
    }

    render(){
        return(
            <div className="principal-container">
                <NavBar selected = "home"/>
                <div className="Games-display">
                    
                    <button className="game-button" onClick={this.handleRaWClick}>Read and Write</button>
                    <button className="game-button">Memotest</button>
                    <button className="game-button">Play</button>
                </div>

                <h1 className="main-title">Start playing right now!</h1>
                
            </div>
        );
    }

    //If user token is not valid, redirects to login page
    async handleAuth(){
        const invalid = await pageAuth();
        if(invalid)
            window.location.href = "/";
    }

    handleRaWClick = () => window.location.href = "/readAndWrite"
}

export default homepage;