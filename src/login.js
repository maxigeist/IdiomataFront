import React, {Component} from "react";
import dict from "./Imagenes/993441.png";
import "./App.css"



class Login extends Component{


    HandleClick = () => window.location.href="/register";

    input_data() {
        var element = document.getElementById('email_input').value;
        var element2 = document.getElementById('password').value;
        console.log(element);
        //Estos dos elements contiene la información de lo que se escribió para intentar de iniciar sesión
    }

    render(){

        return(
            <div className="App">
                <div className='logo-contenedor'>
                    <img
                        className='logo'
                        src = {dict}
                        alt = "logo de Idiomata"
                    />
                </div>
                <h1 className='titulo'>Idiomata</h1>

                <div className='formulario-div'>
                    <form className='formulario'>
                        <input type="text" placeholder = "Email" required id="email_input" />
                        <input type='password' placeholder = "Password" id='password' required/>
                        <button className='boton-submit' onClick={this.input_data}>Log In</button>
                        <button className='boton-submit' onClick={this.HandleClick}> Register</button>
                    </form>
                </div>


            </div>


        );

    }

}
export default Login;