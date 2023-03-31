import {Component} from "react";
import dictImg from "../resources/993441.png";
import "../style/App.css";
import Requester from "../util/requester";
import { saveTokenToDom} from "../util/domHandler"
import Swal from "sweetalert2";

const userDataRequester = new Requester();


class Login extends Component{

    constructor(props){
        super(props)

        this.state = {email: "", password: ""}

        this.handleLogin = this.handleLogin.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    render(){
        return(
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
                        <input type="text" placeholder = "Email"  id="email_input" required onChange={this.handleEmailChange}/>
                        <input type='password' placeholder = "Password" id='password' required onChange={this.handlePasswordChange}/>
                        <button className='buttons-login' onClick={this.handleLogin} >Log In</button>
                        <button className='buttons-login' onClick={this.goToRegister} > Register</button>
                    </form>
                </div>
            </div>
        );
    }

    goToRegister = () => {
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
            window.location.href="/home";
        }
        else{
            Swal.fire({
                icon: 'error',
                titleText:"Login failed",
                text: "Check your email and password",
                position:"top",
                padding: "3em 3em 3em 3em"
            })
        }

    }

    handleEmailChange(event){
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }
}
export default Login;