import { Component } from "react";
import "../style/homepage.css"
import dictImg from "../resources/993441.png";
import { pageAuth } from "../util/pageAuth";


class homepage extends Component{

    constructor(props){
        super(props)

        this.handleAuth()

        this.handleClick = this.handleClick.bind(this)
    }

    render(){
        return(
            <div className="principal-container">
                <div className="header">
                    <img className="logo" src={dictImg}
                    alt="logo"
                    ></img>
                    <nav>
                        <ul className="ul-nav">
                            <li className = "nav-li home-li" onClick={this.handleClick}>Home</li>
                            <li className="nav-li">Stats</li>
                            <li className="nav-li">Chat</li>
                            <li className="nav-li Account-li">Account</li>
                        </ul>
                    </nav>
                
                    </div>
                <div className="Games-display">
                    
                    <button className="game-button" onClick={this.handleRaWClick}>Read and Write</button>
                    <button className="game-button">Memotest</button>
                    <button className="game-button">Play</button>
                </div>

                <h1 className="main-title">Start playing right now!</h1>
                
            </div>
        );
    }
    
    handleClick =  () => window.location.href = "/homepage";

    //If user token is not valid, redirects to login page
    async handleAuth(){
        const invalid = await pageAuth();
        if(invalid)
            window.location.href = "/";
    }

    handleRaWClick = () => window.location.href = "/readAndWrite"
}

export default homepage;