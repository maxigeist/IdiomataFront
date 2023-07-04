import { Component } from "react";
import NavBar from "../components/navbar";
import "../style/account.css"
import UserRequester from "../util/requester/userRequester";
import { Button, Modal } from 'react-bootstrap';
import LanguageSelector from "../components/languageSelector";

import Swal from "sweetalert2";
import { pageAuth } from "../util/pageAuth";


class account extends Component{

    requester = new UserRequester();

    
    
    constructor(props){
        super(props)

        this.handleAuth()

        this.state = {showLanguageSelector: false, languageSelected: ""}
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleLanguageSave = this.handleLanguageSave.bind(this)
    }

    async componentDidMount(){
        const data = await this.requester.getUserData()
        data.data.newLanguage = ""
        this.setState(data.data)
    }

    render(){
        return(
            <div>
                <NavBar selected = "account"/>
                <div className="col-6 p-4">
                    <div className="card">
                        <h3 className="card-header mb-3 bg-warning">Profile</h3>
                        <div className="card-body">
                            <h4 className="mb-5">Name: {this.state.name}</h4>
                            <div className="row mb-5">
                                <h4 className="col">Email: {this.state.email}</h4>
                                <button onClick={this.handleEmailChange} type="button" className="btn btn-warning col-2">Change</button>
                            </div>
                            <div className="row mb-5">
                                <h4 className="col">Password: ****</h4>
                                <button onClick={this.handlePasswordChange} type="button" className="btn btn-warning col-2">Change</button>
                            </div>
                            
                            <div className="row mb-5">
                                <h4 className="col"> Language: {this.state.language}</h4>
                                <button onClick={()=> this.setState({ showLanguageSelector: true})} type="button" className={"btn btn-warning col-2 "}>Change</button>
                            </div>
                            <Modal show={this.state.showLanguageSelector} onHide={() => this.setState({ showLanguageSelector: false })}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Select Language</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <LanguageSelector func={this.handleLanguageChange}/>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ showLanguageSelector: false })}>
                                Close
                                </Button>
                                <Button variant="secondary" onClick={this.handleLanguageSave}>
                                Save
                                </Button>
                                </Modal.Footer>
                            </Modal>

                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    async handlePasswordChange(){
        Swal.fire({
            title: 'Insert new password',
            input: 'password',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        })
        .then(async result => {
            if(result.value){
                let newPassword = result.value;
                const response = await this.requester.changeUserPassword(newPassword);
                if(response !== 200){
                    Swal.fire({
                        icon: 'error',
                        titleText: 'Update Failed',
                        text: 'Invalid password',
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                }else{
                    Swal.fire({
                        icon: 'success',
                        titleText: 'Password Updated',
                        text: 'Your password has been updated successfully',
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                    .then(function(){window.location.reload()})
                }
            }
        })
    }

    async handleEmailChange(){
        Swal.fire({
            title: 'Insert new email',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        })
        .then(async result => {
            
            if(result.value){
                let newEmail = result.value;
                const response = await this.requester.changeUserEmail(newEmail);
                if(response.status !== 200){
                    Swal.fire({
                        icon: 'error',
                        titleText: 'Update Failed',
                        text: 'Email is already taken',
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                }else{
                    Swal.fire({
                        icon: 'success',
                        titleText: 'Email Updated',
                        text: 'Your email has been updated successfully',
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                    .then(function(){window.location.reload()})
                }
            }
            
        })
        
    }

    async handleLanguageChange(event){
        this.setState({languageSelected: event.target.value})
    }

    async handleLanguageSave(){
        const language = this.state.languageSelected
        this.setState({showLanguageSelector: false, languageSelected: ""})
        if(!language || language.length === 0){
            Swal.fire({icon: "warning", title: "No language selected"})
            return
        }

        const code = await this.requester.changeUserLanguage(language);
        if(code === 200){
            Swal.fire({icon: "success", title:"Language Updated"})
            this.componentDidMount();
            return
        }else{
            Swal.fire({icon: "error", title:"Something went wrong"})
            return
        }
    }

    //If user token is not valid, redirects to login page
    async handleAuth(){
        const invalid = await pageAuth()
        if(invalid)
            Swal.fire({
                icon: "warning",
                titleText: "Session expired",
                text: "You must login again",
                position:"top",
                padding: "3em 3em 3em 3em"
            }).then(() => {window.location.href = "/";})
    }
}

export default account;