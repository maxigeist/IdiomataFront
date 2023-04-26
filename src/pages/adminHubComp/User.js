import React from "react";
import UserRequester from "../../util/requester/userRequester";
import { alert } from "../../util/alert";

const userRequester = new UserRequester()
class User extends React.Component{

    constructor(props){
        super(props)
        this.state = {userEmail: ""}

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    render(){
        console.log(this.state.userEmail)
        return(
            <div className="container col-3">
            <div className="card">
                <h4 className="card-header">Delete User</h4>
                <div className="p-2">
                    <label className="form-label">Enter user email:</label>
                    <input className="form-control shadow-none" onChange={this.handleEmailChange}/>

                    <br/>


                    <br/>
                    
                    <button className="btn btn-danger fs-5 w-25" onClick={this.handleDelete}><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
        )
    }

    async handleDelete(){
        const status = await userRequester.deleteUser(this.state.userEmail)
        if(status === 200){
            alert('success', 'User deleted successfully', '')
        }
        else{
            alert('error', 'An error occurred', 'User not found')
        }
    }
    

    handleEmailChange(event){
        this.setState({userEmail: event.target.value})
    }
}

export default User;