import {Component} from "react";
import dictImg from "../resources/993441.png";
import "../style/App.css";
import UserRequester from "../util/requester/userRequester";
import { saveTokenToDom} from "../util/domHandler"
import { alert } from "../util/alert";

const userDataRequester = new UserRequester();

class Login extends Component{

    constructor(props){
        super(props)

        this.state = {email: "", password: ""}

        this.handleLogin = this.handleLogin.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleAdminLogin = this.handleAdminLogin.bind(this);
    }

    render(){
        return(
            <div className="Body-princ">
            <div className="App">
                <div className='logo-contenedor'>
                    <img
                        className='logo'
                        src = {dictImg}
                        alt = "logo de Idiomata"
                    />
                </div>
                <h1 className='titulo'>Idiomata</h1>

                <div className='formulario-div'>
                    <form className='formulario'>
                        <input className="form-input" type="text" placeholder = "Email"  id="email_input" required autoComplete="" onChange={this.handleEmailChange}/>
                        <input className="form-input password-input" type='password' placeholder = "Password" id='password' required onChange={this.handlePasswordChange}/>
                        <button className='main-buttons buttons-login' onClick={this.handleLogin} >Log In</button>
                        <button className='main-buttons buttons-login' onClick={this.goToRegister} > Register</button> 
                        <p className="admin-p">Log in as  <label  onClick ={this.handleAdminLogin}className="admin-log-in">Admin</label></p>
                    </form>
                </div>
            </div>
            </div>
        );
    }

    goToRegister = (e) => {
        window.location.href="/register"
    };

    /**
     * Requests login and if successful, saves token to DOM and redirects to homepage.
     */
    async handleLogin(event){
        event.preventDefault()

        const token = await userDataRequester.LoginUser(this.state.email, this.state.password);
        if(token){
            saveTokenToDom(token);
            window.location.href="/homepage";
        }
        else{
            alert('error', "Login failed", "Check your email and password")
        }

    }

    handleEmailChange(event){
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }

    handleAdminLogin = () => window.location.href = "/admin";
}
export default Login;