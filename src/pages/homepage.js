import { Component } from "react";
import "../style/homepage.css"
import Requester from "../util/requester";
import Swal from "sweetalert2";
import NavBar from "../components/navbar";

const userRequester = new Requester()

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

        if(!await userRequester.isAuth()) {
            Swal.fire({
                icon: 'error',
                titleText:"Session expired",
                text: "You must login again",
                position:"top",
                padding: "3em 3em 3em 3em"
            })
   
            await this.delay(3000)
            window.location.href = "/"
        }
    }

    delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    handleRaWClick = () => window.location.href = "/readAndWrite"
}


export default homepage;