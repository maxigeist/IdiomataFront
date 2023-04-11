import { Component } from "react";
import NavBar from "../components/navbar";
import "../style/account.css"
import Requester from "../util/requester";
import { getTokenFromDom, deleteTokenFromDom} from "../util/domHandler"
import Swal from "sweetalert2";


class account extends Component{

    requester = new Requester();

    
    
    constructor(props){
        super(props)

        this.state = {}
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    async componentDidMount(){
        const data = await this.requester.getUserData()
        this.setState(data.data)
    }

    render(){
        return(
            <div>
                <NavBar selected = "account"/>
                <div>
                    <h1 className="profile">Name: {this.state.name}</h1>
                    <h2 className="profile">Email: {this.state.email}</h2>
                    <h3 className="profile">Password: ****</h3>
                </div>
                <div>
                    <button onClick={this.handleLogOut}>LogOut</button>
                </div>
            </div>
        )
    }

    async handleLogOut(){
        
        const token = getTokenFromDom();
        const status = await this.requester.logOutUser()

        if (status === 200){
        deleteTokenFromDom(token);
        window.location.href = "/";
        }
        else{
            Swal.fire({
                icon: 'error',
                titleText:"LogOut failed",
                text: "An error occurred",
                position:"top",
                padding: "3em 3em 3em 3em"
            })
        }
    }

}

export default account;