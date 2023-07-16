import { Component } from "react";
import "../style/homepage.css"
import NavBar from "../components/navbar";
import { pageAuth } from "../util/pageAuth";
import GamesDisplay from "../components/gamesdisplay";
import Swal from "sweetalert2";


class Homepage extends Component{

    constructor(props){
        super(props)

        this.handleAuth()
    }

    render(){
        return(
            <div style={{height:"100vh", width:"100%"}}>
                <div className="principal-container">
                <NavBar selected = "home" t={this.props.t}/>
                {/* <h1 className="main-title">Start playing right now!</h1> */}
                </div>
                <div className="game">
                    <GamesDisplay t={this.props.t}/>
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
                titleText: this.t("global:header:Session-expired"),
                text: this.t("global:header:You-must-login-again"),
                position:"top",
                padding: "3em 3em 3em 3em"
            }).then(() => {window.location.href = "/";})
            
    }
}

export default Homepage;