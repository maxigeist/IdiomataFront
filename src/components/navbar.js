import { Component } from "react";
import dictImg from "../resources/993441.png";
import "../style/navbar.css"


class NavBar extends Component{

    selected = {home: "", stats: "", chat: "", account: ""}

    constructor(props){
        super(props)

        this.redirectHomePage = this.redirectHomePage.bind(this)
        this.redirectAccountPage = this.redirectAccountPage.bind(this)
        this.selected[this.props.selected] = "selected-li";
    }

    render(){

        return(
            <div className="header">
                    
                    
                    <div class="w-100">
                    <nav>
                    <img src={dictImg} class="logo-img rounded float-start" alt="logo"></img>
                    <ul className="nav pt-5">
                    
                    <div class="d-flex justify-content-evenly w-75">
                            <li className ={"nav-li " + this.selected.home + " nav-link fs-2"} onClick={this.redirectHomePage}>Home</li>
                            <li className={"nav-li " + this.selected.stats + " nav-link fs-2"} >Stats</li>
                            <li className={"nav-li " + this.selected.chat + " nav-link fs-2"}>Chat</li>
                    </div>

                    
                        
                    <div class="ms-auto me-5">
                        <li className={"nav-li Account-li " + this.selected.account + " nav-link fs-2"} onClick={this.redirectAccountPage}>Account</li>
                    </div>
                    </ul>
                    
                    
                    
                    </nav>
                    </div>
            </div>
        )

    }
    redirectHomePage =  () => window.location.href = "/homepage";
    redirectAccountPage = () => window.location.href = "/account";
}

export default NavBar;