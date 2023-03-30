import { Component } from "react";
import "../style/homepage.css"
import dictImg from "../resources/993441.png";


class homepage extends Component{

    render(){

        return(
            <div className="principal-container">
                <div className="header">
                    <img className="logo" src={dictImg}
                    alt="logo"
                    ></img>
                    <nav>
                        <ul>
                            <li>Home</li>
                            <li>Stats</li>
                            <li>Chat</li>
                            <li className="Account-li">Account</li>
                        </ul>
                    </nav>
                
                    </div>
                <div className="Games-display">
                    
                    <button className="game-button">Read and Write</button>
                    <button className="game-button">Listen</button>
                    <button className="game-button">Play</button>
                     

                </div>
        
                
            </div>

        );


    }

    


}


export default homepage;