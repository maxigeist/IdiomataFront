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
        this.t = this.props.t;

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
                <div className="form-div2">
                <h2>{this.t("global:header:Admin-Log-In")}</h2>
                
                
                <div class="form-floating mb-3 ">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={this.handleEmailChange} autoComplete="off"/>
                    <label for="floatingInput">{this.t("global:header:Email")}</label>
                </div>
                <form onSubmit={this.handleLogIn}>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={this.handlePasswordChange}/>
                    <label for="floatingPassword">{this.t("global:header:Password")}</label>
                </div>
                </form>
                
                <div class="row-cols-auto mt-2">
                <button type="button" class="btn btn-success m-1 " onClick={this.handleLogIn}>{this.t("global:header:Login")}</button>
                <button type="button" className="btn btn-primary m-1   " onClick={this.handleBack}>{this.t("global:header:Back")}</button>
                </div>
                
                
                </div>
                
                
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
            alert('error', this.t("global:header:Login-failed"),this.t("global:header:Check-your-email-and-password"))
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