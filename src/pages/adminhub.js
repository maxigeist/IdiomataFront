import { Component } from "react";
import "../style/adminpage.css"
import Swal from "sweetalert2";
import AdminRequester from "../util/requester/adminRequester";
import { deleteTokenFromDom } from "../util/domHandler";
import { AdminPageAuth } from "../util/pageAuth";
import CateLan from "./adminHubComp/CateLan";
import { Word } from "./adminHubComp/Word";

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
                
                    <div>
                    <div class = "position-absolute top-0 start-50 translate-middle-x">
                    <h1 className="display-6">ABM</h1>
                    </div>
                    <div class="d-flex flex-column align-items-end">
                    <button type="button" class="btn btn-danger float-right btn-sm bts" onClick={this.handleLogOut}>Log out</button>
                    </div>
                    </div>
                        
                        <div>
                        <ul class="nav d-flex justify-content-evenly ">
                            
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar" id="Category" onClick={this.handleFirstOp}>Category</label>
                            </li>
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar" id="Word" onClick={this.handleFirstOp}>Word</label>
                            </li>
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar" id="Language" onClick={this.handleFirstOp} >Language</label>
                            </li>
                            <li class="nav-item">
                                <label class="nav-link fs-2 navbar">User</label>
                            </li>
                        </ul>
                            {/* <ul className="nav justify-content-center"></ul>
                            <li className="Category nav-item" onClick={this.handleFirstOp}>Category</li> 
                            <li className="Word nav-item"onClick={this.handleFirstOp}>Word</li>
                            <li className="Language nav-item"onClick={this.handleFirstOp}>Language</li>
                            <li className="User nav-item" onClick={this.handleFirstOp}>User</li> */}
                        </div>
                        <div className="first-op"><FirstOp to = {this.state.to}></FirstOp></div>
                                            
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
        Swal.fire({
            icon: "warning",
            titleText: "Session expired",
            text: "You must login again",
            position:"top",
            padding: "3em 3em 3em 3em"
        }).then(() => {window.location.href = "/admin";})
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
                <CateLan to={this.props.to}/>
                
            );
        }

        if(this.props.to === "Word"){
            return(
                <Word/>
            )
        }

    }


}



