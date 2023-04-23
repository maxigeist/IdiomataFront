import { Component } from "react";
import "../style/homepage.css"
import NavBar from "../components/navbar";
import { pageAuth } from "../util/pageAuth";
import GamesDisplay from "../components/gamesdisplay";
import Swal from "sweetalert2";


class homepage extends Component{

    constructor(props){
        super(props)

        this.handleAuth()
    }

    render(){
        return(
            <div style={{height:"100vh", width:"100%"}}>
                <div className="principal-container">
                <NavBar selected = "home"/>
                {/* <h1 className="main-title">Start playing right now!</h1> */}
                </div>
                <div className="game">
                    <GamesDisplay/>
                </div>
            </div>

        );
    }

    //If user token is not valid, redirects to login page
    async handleAuth(){
        const invalid = await pageAuth();
        if(invalid)
            Swal.fire({
                icon: "warning",
                titleText: "Session expired",
                text: "You must login again",
                position:"top",
                padding: "3em 3em 3em 3em"
            }).then(() => {window.location.href = "/";})
            
    }
}

export default homepage;