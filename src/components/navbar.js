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
                    <img className="logo" src={dictImg}
                    alt="logo"
                    ></img>
                    <nav>
                        <ul className="ul-nav">
                            <li className ={"nav-li " + this.selected.home} onClick={this.redirectHomePage}>Home</li>
                            <li className={"nav-li " + this.selected.stats}>Stats</li>
                            <li className={"nav-li " + this.selected.chat}>Chat</li>
                            <li className={"nav-li Account-li " + this.selected.account} onClick={this.redirectAccountPage}>Account</li>
                        </ul>
                    </nav>
                
                    </div>
        )

    }
    redirectHomePage =  () => window.location.href = "/homepage";
    redirectAccountPage = () => window.location.href = "/account";
}

export default NavBar;