import { Component } from "react";
import "../style/homepage.css"
import dictImg from "../resources/993441.png";
import "../style/raw.css"

class readAndWrite extends Component{

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
                    
                    <button className="game-button raw-button">Read and Write</button>
                    <button className="game-button-rawpage">Memotest</button>
                    <button className="game-button-rawpage">Play</button>
                </div>

                       <input className="raw-input"></input>
                
            </div>
            

        );


        

    }
    
    handleClick =  () => window.location.href = "/homepage"

    

    


}


export default readAndWrite;