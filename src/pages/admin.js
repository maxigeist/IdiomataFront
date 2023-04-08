import { Component } from "react";
import "../style/admin.css"



class Admin extends Component{

    constructor(props){
        super(props)
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    render(){
        return(
            <div className="Admin-form-div">
                <form className="Admin-form">
                    <label className="admin-label">Username</label>
                    <input className="admin-input"></input>
                    <label className="admin-label">Password</label>
                    <input type="password" className="admin-input" ></input>
                    <button className="submit-button" onClick={this.handleLogIn} >Log In</button>
                </form>
            </div>

        );
    }

    handleLogIn = (e) => {
        e.preventDefault()
        window.location.href = "/adminpage";
        
    }
     
}


export default Admin;