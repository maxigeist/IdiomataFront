import { Component } from "react";
import NavBar from "../components/navbar";
import "../style/account.css"
import UserRequester from "../util/requester/userRequester";
import LanguageSelector from "../components/languageSelector";

import Swal from "sweetalert2";
import SweetAlert2 from "react-sweetalert2";
import { pageAuth } from "../util/pageAuth";

class Account extends Component{

    requester = new UserRequester();

    
    
    constructor(props){
        super(props)

        this.handleAuth()
        this.t = this.props.t;

        this.state = {languageSelected: "", swal: {show: false, title: "", text: "", icon: "", showCancelButton: false, showConfirmButton: false}, showLanguageSelector: false}
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleLanguageSave = this.handleLanguageSave.bind(this)
        this.handleShowLanguageModal = this.handleShowLanguageModal.bind(this)
        this.renderSwal = this.renderSwal.bind(this)
    }

    async componentDidMount(){
        const data = await this.requester.getUserData()
        data.data.newLanguage = ""
        this.setState(data.data)
    }

    render(){
        return(
            <div>
                <NavBar selected = "account" t={this.props.t}/>
                <div className="col-6 p-4">
                    <div className="card">
                        <h3 className="card-header mb-3 bg-warning">{this.t("global:header:Profile")}</h3>
                        <div className="card-body">
                            <h4 className="mb-5">{this.t("global:header:Name")}: {this.state.name}</h4>
                            <div className="row mb-5">
                                <h4 className="col">Email: {this.state.email}</h4>
                                <button onClick={this.handleEmailChange} type="button" className="btn btn-warning col-2">{this.t("global:header:Change")}</button>
                            </div>
                            <div className="row mb-5">
                                <h4 className="col">{this.t("global:header:Password")}: ****</h4>
                                <button onClick={this.handlePasswordChange} type="button" className="btn btn-warning col-2">{this.t("global:header:Change")}</button>
                            </div>
                            
                            <div className="row mb-5">
                                <h4 className="col"> {this.t("global:header:Language")}: {this.state.language}</h4>
                                <button onClick={this.handleShowLanguageModal} type="button" className={"btn btn-warning col-2 "}>{this.t("global:header:Change")}</button>
                            </div>
                            {this.renderSwal()}                            
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
            title: this.t('global:header:Insert-new-password'),
            input: 'password',
            showCancelButton: true,
            confirmButtonText: this.t('global:header:Save'),
            cancelButtonText: this.t('global:header:Cancel'),
        })
        .then(async result => {
            if(result.value){
                let newPassword = result.value;
                const response = await this.requester.changeUserPassword(newPassword);
                if(response !== 200){
                    Swal.fire({
                        icon: 'error',
                        titleText: this.t('global:header:Update-Failed'),
                        text: this.t('global:header:Invalid-password'),
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                }else{
                    Swal.fire({
                        icon: 'success',
                        titleText: this.t('global:header:Password-Updated'),
                        text: this.t('global:header:Your-password-has-been-updated-successfully'),
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
            title: this.t('global:header:Insert-new-email'),
            input: 'email',
            showCancelButton: true,
            confirmButtonText: this.t('global:header:Save'),
            cancelButtonText: this.t('global:header:Cancel'),
        })
        .then(async result => {
            
            if(result.value){
                let newEmail = result.value;
                const response = await this.requester.changeUserEmail(newEmail);
                if(response.status !== 200){
                    Swal.fire({
                        icon: 'error',
                        titleText: this.t('global:header:Update-Failed'),
                        text: this.t('global:header:Email-is-already-taken'),
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                }else{
                    Swal.fire({
                        icon: 'success',
                        titleText: this.t('global:header:Email-Updated'),
                        text: this.t('global:header:Your-email-has-been-updated-successfully'),
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                    .then(function(){window.location.reload()})
                }
            }
            
        })
        
    }

    renderSwal(){
        if(this.state.showLanguageSelector){
            return(<SweetAlert2
                {...this.state.swal}
                onConfirm={this.handleLanguageSave}
                didClose={() => {this.setState({swal: {show: false, title: "", text: "", icon: "", showCancelButton: false, showConfirmButton: false}})}}>

                {<LanguageSelector func={this.handleLanguageChange} t={this.t}/>}
                                
            </SweetAlert2>
            )
        }
    }

    handleShowLanguageModal(){
        this.setState({showLanguageSelector: true, swal: {show: true, title: "Select a language", text: "", icon: "", showCancelButton: true, showConfirmButton: true}})
    }

    async handleLanguageChange(event){
        this.setState({languageSelected: event.target.value})
    }

    async handleLanguageSave(){
        const language = this.state.languageSelected
        this.setState({showLanguageSelector: false, languageSelected: "", swal: {show: false, title: "", text: "", icon: "", showCancelButton: false, showConfirmButton: false}})
        if(!language || language.length === 0){
            Swal.fire({icon: "warning", title:"No language selected"})
            return
        }

        const code = await this.requester.changeUserLanguage(language);
        if(code === 200){
            this.setState({showLanguageSelector: false, languageSelected: "", })
            this.componentDidMount();
            Swal.fire({icon: "success", title:"Language changed"})
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
                titleText: this.t("global:header:Session-expired"),
                text: this.t("global:header:You-must-login-again"),
                position:"top",
                padding: "3em 3em 3em 3em"
            }).then(() => {window.location.href = "/";})
    }
}

export default Account;