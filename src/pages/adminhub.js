import { Component } from "react";
import "../style/adminpage.css"
import Swal from "sweetalert2";
import AdminRequester from "../util/requester/adminRequester";
import { deleteTokenFromDom } from "../util/domHandler";
import { AdminPageAuth } from "../util/pageAuth";
import CateLan from "./adminHubComp/CateLan";

const adminRequester = new AdminRequester();

class AdminHub extends Component{

    constructor(props){
        super(props)
        this.state = {to:""}

        this.handleAuth()

        this.handleFirstOp = this.handleFirstOp.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    render(){
        return(
            <div>
                <div className="Admin-options">
                    <div className="Header">
                    <h1 className="h1-title">ABM</h1>
                    <button className="Log-out" onClick={this.handleLogOut}>Log out</button>
                    </div>
                        <h2 className="h1-title">¿Who do you want to affect?</h2>
                        <label className="Category" id="label"onClick={this.handleFirstOp}>Category</label> 
                        <label className="Word"id="label" onClick={this.handleFirstOp}>Word</label>
                        <label className="Language" id="label" onClick={this.handleFirstOp}>Language</label>
                        <label className="User" id="label" onClick={this.handleFirstOp}>User</label>
                </div>
                        <div className="first-op"><FirstOp to = {this.state.to}></FirstOp></div>
                                            
            </div>
            
        );
        }


        /*
        We can take out the alert from here it is optional to leave it
        */
    async handleFirstOp(event){
        if(this.state.to === "" || this.state.to === event.target.className){
            var getclass = event.target.className;
            var label = document.querySelector(`.${getclass}` ) 
            label.style.color = "white";
            
            var firstop = document.querySelector(".first-op")
            firstop.style.display = "flex";
            this.setState({to: event.target.className})
        }
        else{
            document.querySelector(`.${this.state.to}`).style.color = "black"
            await(this.setState({to: event.target.className}));
            this.handleFirstOp(event)

            
        }
    }

    //This function, need a backEnd part, specifyng that the user has left the session.
    handleLogOut(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You are going to Log Out",
            type: 'warning',
            showDenyButton:true,
            showConfirmButton:true,
            confirmButtonText:"Yes"
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
            window.location.href = "/admin";
    }
}

export default AdminHub;


class FirstOp extends Component{
    constructor(props){
        super(props);
        this.state = {type: "", first_field:"", second_field:"", thirst_field:"",fourth_field:"", fifth_field:"", sixth_field:""};
        
       
    }

    render(){

        //Como tienen el mismo ABM uso el mismo código para los dos
        if(this.props.to === "Category" || this.props.to === "Language"){
            return(
                <CateLan to={this.props.to}></CateLan>
                
            );
        }

        if(this.props.to === "Word"){
            <div className="Word-Container"></div>
        }

    }


}



