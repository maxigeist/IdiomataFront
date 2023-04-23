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
        this.handleBack = this.handleBack.bind(this)
    }

    render(){
        return(
            // <div className="Admin-form-div">
            //     <form className="Admin-form">
            //         <label className="admin-label">Email</label>
            //         <input className="admin-input" onChange={this.handleEmailChange}></input>
            //         <label className="admin-label">Password</label>
            //         <input type="password" onChange={this.handlePasswordChange} className="admin-input" ></input>
            //         <button className="submit-button" onClick={this.handleLogIn} >Log In</button>
            //     </form>
            // </div>
            <div className="form-div">
                
                <div class="form-floating mb-3 col-sm">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={this.handleEmailChange}/>
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={this.handlePasswordChange}/>
                    <label for="floatingPassword">Password</label>
                </div>
                
                <button type="button" class="btn btn-success btn-lg butt" onClick={this.handleLogIn}>Log In</button>
                <button type="button" className="btn btn-primary" onClick={this.handleBack}>Back</button>
                
                
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

    handleBack(){
        window.location.href = "/";
    }
}


export default Admin;