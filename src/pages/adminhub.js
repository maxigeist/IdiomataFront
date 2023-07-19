import { Component } from "react";
import "../style/adminpage.css"
import Swal from "sweetalert2";
import AdminRequester from "../util/requester/adminRequester";
import { deleteTokenFromDom } from "../util/domHandler";
import { AdminPageAuth } from "../util/pageAuth";

import { Word } from "./adminHubComp/Word";
import { Sentence } from "./adminHubComp/Sentence";
import Category from "./adminHubComp/Category";
import Language from "./adminHubComp/Language";
import User from "./adminHubComp/User";

const adminRequester = new AdminRequester();

class AdminHub extends Component{

    constructor(props){
        super(props)
        this.state = {to:"Category"}
        this.t = this.props.t;

        this.handleAuth()

        this.handleFirstOp = this.handleFirstOp.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    render(){
        return(
            <div>
                
                    <div>
                    <div class = "position-absolute top-0 start-50 translate-middle-x">
                    <h1 className="display-6">ABM</h1>
                    </div>
                    <div class="d-flex flex-column align-items-end">
                    <button type="button" class="btn btn-danger float-right btn-sm bts" onClick={this.handleLogOut}>{this.t("global:header:Log-Out")}</button>
                    </div>
                    </div>
                        
                        <div>
                        <ul class="nav d-flex justify-content-evenly ">
                            
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar" id="Category" onClick={this.handleFirstOp} style={{color: 'white'}}>{this.t("global:header:Category")}</label>
                            </li>
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar" id="Word" onClick={this.handleFirstOp}>{this.t("global:header:Word")}</label>
                            </li>
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar" id="Language" onClick={this.handleFirstOp} >{this.t("global:header:Language")}</label>
                            </li>
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar" id="User" onClick={this.handleFirstOp}>{this.t("global:header:User")}</label>
                            </li>
                        </ul>
                            {/* <ul className="nav justify-content-center"></ul>
                            <li className="Category nav-item" onClick={this.handleFirstOp}>Category</li> 
                            <li className="Word nav-item"onClick={this.handleFirstOp}>Word</li>
                            <li className="Language nav-item"onClick={this.handleFirstOp}>Language</li>
                            <li className="User nav-item" onClick={this.handleFirstOp}>User</li> */}
                        </div>
                        <div className="first-op" style={{display: 'flex'}}><FirstOp to = {this.state.to} t={this.t}></FirstOp></div>
                                            
            </div>
            
        );
        }


        /*
        We can take out the alert from here it is optional to leave it
        */
    handleFirstOp(event){
        if(this.state.to === "" || this.state.to === event.target.id){
            
            document.querySelector(`#${event.target.id}`).style.color = "white";
            var firstop = document.querySelector(".first-op")
            firstop.style.display = "flex";
            this.setState({to: event.target.id})
        }
        else{
            document.querySelector(`#${this.state.to}`).style.color = "lightblue";
            (this.setState({to: event.target.id}));
            document.querySelector(`#${event.target.id}`).style.color = "white";

            
        }
    }

    //This function, need a backEnd part, specifyng that the user has left the session.
    handleLogOut(){
        Swal.fire({
            title: this.t("global:header:Are-you-sure"),
            text: this.t("global:header:You-are-going-to-Log-Out"),
            type: 'warning',
            showDenyButton:true,
            showConfirmButton:true,
            confirmButtonText:this.t("global:header:Yes"),
            denyButtonText: this.t("global:header:No"),
          }).then((value) =>{
            if(value.isConfirmed){
                adminRequester.logOut()
                deleteTokenFromDom()
                window.location.href = "/admin"
            }
          })
    }

    async handleAuth(){
        const invalid = await AdminPageAuth();
        if(invalid)
        Swal.fire({
            icon: "warning",
            titleText: this.t("global:header:Session-expired"),
            text: this.t("global:header:You-must-login-again"),
            position:"top",
            padding: "3em 3em 3em 3em"
        }).then(() => {window.location.href = "/admin";})
    }
}

export default AdminHub;


class FirstOp extends Component{

    constructor(props){
        super(props)
        this.t = this.props.t;

        this.state = {sentence: false}
        this.handleSwitch = this.handleSwitch.bind(this)
        this.sentenceSwitch = this.sentenceSwitch.bind(this)
    }

    render(){

        //Como tienen el mismo ABM uso el mismo código para los dos
        if(this.props.to === "Category"){
            return(
                <Category t={this.props.t}/>
            );
        }

        if(this.props.to==="Language"){
            return(
                <Language t={this.props.t}/>
            );
        }
        if(this.props.to === "Word"){

            if(this.state.sentence){
                return(
                    <div>
                        <div className="row">
                            <this.sentenceSwitch/>
                        </div>
                        <div className="row">
                            <Sentence t={this.t}/>
                        </div>
                    </div>
                        
                    
                )
            }else{
                return(
                    <div>
                        <div className="row">
                            <this.sentenceSwitch/>
                        </div>
                        <div className="row">
                            <Word t={this.t}/>
                        </div>
                    </div>
                )
            }
        }

        if(this.props.to === "User"){
            return(
               <User t={this.t}/> 
            )
        }
    }

    sentenceSwitch(){
        return(
            <div className="container col-2 mb-2">
                    <div class="form-check form-switch">
                    <label class="form-check-label h4 text-muted">{this.t("global:header:Sentence")}</label>
                    <input class="form-check-input shadow-none" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={this.handleSwitch}/>
                </div>
            </div>
        )
    }

    handleSwitch(){
        console.log(this.state.sentence)
        this.setState({sentence: !this.state.sentence})
    }
}



