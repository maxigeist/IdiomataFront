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
                        <ul className="ul-nav">
                            <li className = "nav-li home-li" onClick={this.handleClick}>Home</li>
                            <li className="nav-li">Stats</li>
                            <li className="nav-li">Chat</li>
                            <li className="nav-li Account-li">Account</li>
                        </ul>
                    </nav>
                
                    </div>
                <div className="Games-display">
                    
                    <button className="game-button">La re calcada concha de mi reputísima madre</button>
                    <button className="game-button">Memotest</button>
                    <button className="game-button">Play</button>
                </div>

                        <h1 className="main-title">Start playing right now!</h1>
                
            </div>
            

        );


        

    }
    
    handleClick =  () => window.location.href = "/homepage"

    

    


}


export default homepage;