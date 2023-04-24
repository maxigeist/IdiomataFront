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
                            <div>
                                <button onClick={this.handleLogOut} type="button" className="btn btn-danger">LogOut</button>
                            </div>
                        </div>
                    </div>
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
            input: 'password',
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