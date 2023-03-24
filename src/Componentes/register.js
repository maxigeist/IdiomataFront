import dict from "../Imagenes/993441.png";
import "../App.css"
import {Component} from "react";
import Data from "./data";
import swal from "sweetalert2";

const d = new Data();

class Register extends Component{

    constructor(name, email,password,password_2) {
        super();
        this.name = name;
        this.email= email;
        this.password = password;
        this.password_repeat = password_2;

    }

    HandleClick = () => window.location.href="/";

    after_submit(form){
        if(document.getElementById('password').value !== document.getElementById('password_2').value){
            swal.fire({
                icon: 'error',
                text:"The passwords are different",
                titleText:"Error",
                position:"top",
                padding: "3em 3em 3em 3em"
            })
            document.getElementById('password_2').value = "";
        }
        
        else{
            d.saveRegisterData(document.getElementById('name').value, document.getElementById('email').value
            ,document.getElementById('password').value, document.getElementById('password_2').value);      
    }
    }
    after_correct_submit(form){

        swal.fire("The user has been registered");

    }
    handleSubmit(form) {
        alert('A name was submitted: ' + this.state.value);
        
      }


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
                    <form className = 'formulario' id='register-form' action="/" onSubmit={this.after_submit}> 
                        <input type="text" placeholder="Name" id = 'name' required/>
                        <input type="email" placeholder="Email" id = 'email' required/>
                        <input type="password" placeholder="Password" id='password' required/>
                        <input class_name = "" type="password" placeholder="Repeat password" id='password_2' required/>
                        <button className='boton-submit'>Submit</button>
                    </form>
                </div>
            </div>
        );
    }



}
export default Register;

//el atributo action que se pone en el form lo que hace es mandartelo a una ruta una vez que terminaste de completar el formulario