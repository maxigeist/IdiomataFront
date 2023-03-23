import {Component} from "react";
import dictImg from "../resources/993441.png";
import "../style/App.css";



class Login extends Component{

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
                        <input type="text" placeholder = "Email" required id="email_input" />
                        <input type='password' placeholder = "Password" id='password' required/>
                        <button className='boton-submit' onClick={this.HandleLogin}>Log In</button>
                        <button className='boton-submit' onClick={this.HandleRegister}> Register</button>
                    </form>
                </div>
            </div>
        );
    }

    HandleRegister = () => window.location.href="/register";

    HandleLogin() {
        var element = document.getElementById('email_input').value;
        var element2 = document.getElementById('password').value;
        console.log(element);
        //Estos dos elements contiene la información de lo que se escribió para intentar de iniciar sesión
    }
}
export default Login;