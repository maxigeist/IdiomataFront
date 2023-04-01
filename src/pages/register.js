import dictImg from "../resources/993441.png";
import "../style/App.css";
import {Component} from "react";
import Requester from "../util/requester";
import swal from "sweetalert2";

const userDataRequester = new Requester();


class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: "", password_2: "", language:""};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleLanguageChange= this.handleLanguageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <body className="Register-body">
            <div className="App">
                <div className='logo-contenedor'>
                    <img
                        className='logo'
                        src={dictImg}
                        alt="logo de Idiomata"
                    />
                </div>
                
                <h2 className='titulo'>Register</h2>
                <div className='formulario-de-registro'>
                    <form className="formulario"> 
                        <input className="form-input" type="text" placeholder="Name" id ='name' required onChange={this.handleNameChange}/>
                        <input className="form-input" type="email" placeholder="Email" id = 'email' required onChange={this.handleEmailChange}/>
                        <input className="form-input" type="password"  placeholder="Password" id='password' required onChange={this.handlePasswordChange}/>
                        <input className="form-input" type="password" placeholder="Repeat password" id='password_2' required onChange={this.handlePassword2Change} value={this.state.password_2}/>
                        
                        <select className="languages" required onChange={this.handleLanguageChange} >
                            <option value="">Language to learn</option>
                            <option>Spanish</option>
                            <option>Italian</option>
                            <option>French</option>
                        </select>
                        <button className='main-buttons buttons-submit' onClick={this.handleSubmit}>Create Account</button>
                    </form>
                </div>
            </div>
            </body>
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
    handleLanguageChange(event){
        this.setState({language:event.target.value})
    }

    async handleSubmit(event){
        if(this.state.password !== this.state.password_2){
            swal.fire({
                icon: 'error',
                titleText:"The passwords are different",
                text:"Error",
                position:"top",
                padding: "3em 3em 3em 3em"
            })
            this.setState({password_2: ""});
        } 
        else if(this.state.language === ""){
            swal.fire({
                icon: 'error',
                titleText:"You have to pick a language",
                text:"Error",
                position:"top",
                padding: "3em 3em 3em 3em"
            })
            this.setState({password_2: ""});
        }
        else{
            event.preventDefault()

            userDataRequester.saveRegisterData(this.state.name, this.state.email, this.state.password, this.state.language);
            
            swal.fire({
                icon: 'success',
                text:"You can now log in to your account",
                titleText:"Registration Succesfully",   
                position:"top",
                padding: "3em 3em 3em 3em"
            })
            await this.delay(3000)
            this.redirect()
        }
            }

            redirect = () => window.location.href="/";

    delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}
export default Register;