import dict from "../Imagenes/993441.png";
import "../App.css"
import {Component} from "react";


class Register extends Component{

    constructor(name, email,password,password_2) {
        super();
        this.name = name;
        this.email= email;
        this.password = password;
        this.password_repeat = password_2;

    }

    HandleClick = () => window.location.href="/";



    test(){
        var p = new Register(document.getElementById('name').value, document.getElementById('email').value
        ,document.getElementById('password').value, document.getElementById('password_2').value);
        console.log(p.name)
        console.log(p.email)
        console.log(p.password)
        console.log(p.password_repeat)
        return p;
    }




    render() {






        return (
            <div className="App">
                <div className='logo-contenedor'>
                    <img
                        className='logo'
                        src={dict}
                        alt="logo de Idiomata"
                    />
                </div>

                <h2 className='titulo'>Register</h2>
                <div className='formulario-de-registro'>
                    <form>
                        <input type="text" placeholder="Name" id = 'name'  required/>
                        <input type="email" placeholder="Email" id = 'email' required/>
                        <input type="password" placeholder="Password" id='password' required/>
                        <input type="password" placeholder="Repeat password" id='password_2' required/>
                        <button className='boton-submit' onClick={this.test}>Enviar</button>
                    </form>
                </div>
            </div>
        );
    }



}
export default Register;