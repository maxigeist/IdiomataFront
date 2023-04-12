import { Component } from "react";
import NavBar from "../components/navbar";
import "../style/account.css"
import UserRequester from "../util/requester/userRequester";
import { getTokenFromDom, deleteTokenFromDom} from "../util/domHandler"
import Swal from "sweetalert2";


class account extends Component{

    requester = new UserRequester();

    
    
    constructor(props){
        super(props)

        this.state = {}
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    async componentDidMount(){
        const data = await this.requester.getUserData()
        this.setState(data.data)
        console.log(data.data)
    }

    render(){
        return(
            <div>
                <NavBar selected = "account"/>
                <div>
                    <h1 className="profile">Name: {this.state.name}</h1>
                    <h2 className="profile">Email: {this.state.email}</h2>
                    <label onClick={this.handleEmailChange}>Change Email</label>
                    <h3 className="profile">Password: ****</h3>
                    <label onClick={this.handlePasswordChange}>Change Password</label>
                </div>
                <div>
                    <button onClick={this.handleLogOut}>LogOut</button>
                </div>
            </div>
        )
    }

    async handleLogOut(){
        
        const token = getTokenFromDom();


        Swal.fire({
            icon: 'warning',
            titleText: 'Are you sure you want to LogOut?',
            showCancelButton: true,
            confirmButtonText: 'Yes, LogOut',
            cancelButtonText: 'Cancel',
        })
        .then(result => {
            if(result.value){
                this.requester.logOutUser();        
                deleteTokenFromDom(token);
                window.location.href = "/";
            }
            }
        )
    }

    async handlePasswordChange(){
        Swal.fire({
            title: 'Insert new password',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        })
        .then(result => {
            if(result.value){
                let newPassword = result.value;
                this.requester.changeUserPassword(newPassword);
                Swal.fire({
                    icon: 'success',
                    titleText: 'Password Updated',
                    text: 'Your password has been updated successfully',
                    position:"top",
                    padding: "3em 3em 3em 3em"
                })
                .then(function(){window.location.reload()})
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
        .then(result => {
            if(result.value){
                let newEmail = result.value;
                this.requester.changeUserEmail(newEmail);
                Swal.fire({
                    icon: 'success',
                    titleText: 'Email Updated',
                    text: 'Your email has been updated successfully',
                    position:"top",
                    padding: "3em 3em 3em 3em"
                })
                .then(function(){window.location.reload()})
            }
        })
    }
}

export default account;