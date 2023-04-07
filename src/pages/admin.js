import { Component } from "react";
import "../style/admin.css"
import AdminRequester from "../util/requester/adminRequester";
import { saveTokenToDom } from "../util/domHandler";
import { alert } from "../util/alert";

const adminRequester = new AdminRequester(); 

class Admin extends Component{

    constructor(props){
        super(props)
        this.state = {email:"", password:""}

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    render(){
        return(
            <div className="Admin-form-div">
                <form className="Admin-form">
                    <label className="admin-label">Email</label>
                    <input className="admin-input" onChange={this.handleEmailChange}></input>
                    <label className="admin-label">Password</label>
                    <input className="admin-input" onChange={this.handlePasswordChange} ></input>
                    <button className="submit-button" onClick={this.handleLogIn}>Log In</button>
                </form>
            </div>
        );
    }

    async handleLogIn(e){
        e.preventDefault()

        const token = await adminRequester.LoginAdmin(this.state.email, this.state.password);
        if(token){
            saveTokenToDom(token);
            window.location.href = "/adminpage";
        }
        else{
            alert('error', "Login failed", "Check your email and password")
        }
    }

    handleEmailChange(e){
        this.setState({email: e.target.value})
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }
}


export default Admin;