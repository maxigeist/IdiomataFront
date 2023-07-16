import { Component } from "react";
import dictImg from "../resources/993441.png";
import "../style/navbar.css"
import Swal from "sweetalert2";
import { getTokenFromDom, deleteTokenFromDom} from "../util/domHandler"
import UserRequester from "../util/requester/userRequester";



class NavBar extends Component{

    requester = new UserRequester();
    selected = {home: "", stats: "", chat: "", account: ""}

    constructor(props){
        super(props)

        this.t = this.props.t

        this.redirectHomePage = this.redirectHomePage.bind(this);
        this.redirectAccountPage = this.redirectAccountPage.bind(this);
        this.redirectStatsPage = this.redirectStatsPage.bind(this);
        this.selected[this.props.selected] = "selected-li";
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    render(){

        return(
            <div className="header">
                    
                    
                    <div class="w-100">
                    <nav>
                    <img src={dictImg} class="logo-img rounded float-start" alt="logo"></img>

                    <div className="pt-5">
                    <ul className="nav " data-bs-theme="dark">
                    
                    <div class="d-flex justify-content-evenly w-75">
                            <li className ={"nav-li " + this.selected.home + " nav-link fs-2"} onClick={this.redirectHomePage}><i class="bi bi-joystick navicon"></i>{this.t("global:header:Play")}</li>
                            <li className={"nav-li " + this.selected.stats + " nav-link fs-2"} onClick={this.redirectStatsPage}><i class="bi bi-bar-chart-fill navicon" ></i>{this.t("global:header:Stats")}</li>
                            <li className={"nav-li " + this.selected.chat + " nav-link fs-2"} onClick={this.redirectFriendsPage}><i class="fa-solid fa-user-group navicon"></i>{this.t("global:header:Friends")}</li>
                    </div>

                    
                        
                    <div class="ms-auto me-5">
                        <li className={"nav-li Account-li " + this.selected.account + " nav-link fs-2"} onClick={this.redirectAccountPage}><i class="bi bi-person-circle navicon"></i>{this.t("global:header:Account")}</li>
                    </div>
                    </ul>
                    </div>
                    
                    
                    
                    
                    </nav>
                    </div>
                    <button onClick={this.handleLogOut} type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1">{this.t("global:header:Log-Out")}</button>
            </div>
        )

    }
    redirectHomePage =  () => window.location.href = "/homepage";
    redirectAccountPage = () => window.location.href = "/account";
    redirectStatsPage = () => window.location.href = "/stats";
    redirectFriendsPage = () => window.location.href = "/friends";

    async handleLogOut(){
        
        const token = getTokenFromDom();


        Swal.fire({
            title: this.t("global:header:Are-you-sure"),
            text: this.t("global:header:You-are-going-to-Log-Out"),
            type: 'warning',
            showDenyButton:true,
            showConfirmButton:true,
            confirmButtonText:this.t("global:header:Yes"),
            denyButtonText: this.t("global:header:No"),
        })
        .then(result => {
            if(result.value){
                this.requester.logOutUser();        
                deleteTokenFromDom(token);
                window.location.href = "/";
            }
            }
        )
    }

}

export default NavBar;