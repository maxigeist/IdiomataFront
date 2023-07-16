import dictImg from "../resources/993441.png";
import "../style/App.css";
import {Component} from "react";
import UserRequester from "../util/requester/userRequester";
import { alert } from "../util/alert";
import Swal from "sweetalert2";
import LanguageSelector from "../components/languageSelector";



const userDataRequester = new UserRequester();



class Register extends Component{

    constructor(props) {
        super(props);
        this.t = this.props.t;
        this.state = {name: "", email: "", password: "", password_2: "", language:""};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleLanguageChange= this.handleLanguageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.relocate = this.relocate.bind(this);
    }

    render() {
        return (
            <div className="Register-body">
            <div className="App">
                <div className='logo-contenedor'>
                    <img
                        className='logo'
                        src={dictImg}
                        alt="logo de Idiomata"
                    />
                </div>
                
                <h2 className='titulo'>{this.t("global:header:Register")}</h2>
                <div className='formulario-de-registro'>
                    <form className="formulario"> 
                        <input className="form-input" type="text" placeholder={this.t("global:header:Name")} id ='name' required onChange={this.handleNameChange} autoComplete="off"/>
                        <input className="form-input" type="email" placeholder="Email" id = 'email' required onChange={this.handleEmailChange} autoComplete="off"/>
                        <input className="form-input" type="password"  placeholder={this.t("global:header:Password")} id='password' required onChange={this.handlePasswordChange} value={this.state.password}/>
                        <input className="form-input" type="password" placeholder={this.t("global:header:Repeat-Password")} id='password_2' required onChange={this.handlePassword2Change} value={this.state.password_2}/>
                        <LanguageSelector func={this.handleLanguageChange}/>
                        <button className='main-buttons buttons-submit' onClick={this.handleSubmit}>{this.t("global:header:Create-Account")}</button>
                        <button className='main-buttons buttons-submit text-black back-button' onClick={this.relocate}>{this.t("global:header:Back")}</button>
                    </form>
                </div>
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
    handleLanguageChange(event){
        this.setState({language:event.target.value})
    }

    async handleSubmit(event){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(this.state.password !== this.state.password_2){
            alert('error',this.t("global:header:The-passwords-are-different"))
            this.setState({password_2: ""});
        } 
        else if(this.state.password === ""){
            alert('error',this.t("global:header:Password-missing"))
            this.setState({password: ""})
            this.setState({password_2: ""})
        }
        else if(this.state.password.includes(" ")){
            alert('error', this.t("global:header:Password-must-not-contain-blank-spaces"))
            this.setState({password: ""})
            this.setState({password_2: ""})
        }
        else if(!emailRegex.test(this.state.email)){
            alert('error',this.t("global:header:The-email-is-not-valid"))
            this.setState({email: ""});
        }
        else{
            event.preventDefault()

            console.log(this.state.language)

            const response = await userDataRequester.saveRegisterData(this.state.name, this.state.email, this.state.password, this.state.language);

            console.log(response)

            if(response.status !== 200){
                Swal.fire({
                    icon: 'error',
                    titleText: this.t("global:header:Registration-failed"),
                    text: this.t("global:header:Email-is-already-taken"),
                    position:"top",
                    padding: "3em 3em 3em 3em"
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    titleText: this.t("global:header:You-can-now-log-in-to-your-account"),
                    text: this.t("global:header:Registration-succesfully"),
                    position:"top",
                    padding: "3em 3em 3em 3em"
                }).then(() => {window.location.href="/";})
            }
            
        }
    }

    relocate(){
        window.location.href = "/";
    }

}
export default Register;