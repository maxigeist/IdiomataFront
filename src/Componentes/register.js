import dict from "../Imagenes/993441.png";
import "../App.css"
import {Component} from "react";
import Data from "./data";
import swal from "sweetalert2";

const userDataRequester = new Data();

class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: "", password_2: ""};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    <form action="/"> 
                        <input type="text" placeholder="Name" id ='name' required onChange={this.handleNameChange}/>
                        <input type="email" placeholder="Email" id = 'email' required onChange={this.handleEmailChange}/>
                        <input type="password" placeholder="Password" id='password' required onChange={this.handlePasswordChange}/>
                        <input type="password" placeholder="Repeat password" id='password_2' required onChange={this.handlePassword2Change} value={this.state.password_2}/>
                        <button className='boton-submit' onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    handleNameChange(event){
        this.setState({name: event.target.value})
    }

    handleEmailChange(event){
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }

    handlePassword2Change(event){
        this.setState({password_2: event.target.value})
    }

    handleSubmit(event){
        if(this.state.password !== this.state.password_2){
            event.preventDefault()
            swal.fire({
                icon: 'error',
                text:"The passwords are different",
                titleText:"Error",
                position:"top",
                padding: "3em 3em 3em 3em"
            })
            this.setState({password_2: ""});
        } 
        else{
            event.preventDefault()
            userDataRequester.saveRegisterData(this.name, this.email, this.password, this.password_2);
        }
    }
}
export default Register;

//el atributo action que se pone en el form lo que hace es mandartelo a una ruta una vez que terminaste de completar el formulario