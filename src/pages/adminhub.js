import { Component } from "react";
import "../style/adminpage.css"
import Swal from "sweetalert2";





class AdminHub extends Component{

    constructor(props){
        super(props)
        this.state = {to:""}

        this.handleFirstOp = this.handleFirstOp.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    render(){
        return(
            <div>
                <div className="Admin-options">
                    <div className="Header">
                    <h1 className="h1-title">ABM</h1>
                    <button className="Log-out" onClick={this.handleLogOut}>Log out</button>
                    </div>
                        <h2 className="h1-title">¿Who do you want to affect?</h2>
                        <label className="Category" id="label"onClick={this.handleFirstOp}>Category</label> 
                        <label className="Word"id="label" onClick={this.handleFirstOp}>Word</label>
                        <label className="Language" id="label" onClick={this.handleFirstOp}>Language</label>
                        <label className="User" id="label" onClick={this.handleFirstOp}>User</label>
                </div>
                        <div className="first-op"><FirstOp to = {this.state.to}></FirstOp></div>
                                            
            </div>
            
        );
        }
    handleFirstOp(event){
        if(this.state.to === "" || this.state.to === event.target.className){
            var getclass = event.target.className;
            var label = document.querySelector(`.${getclass}` ) 
            label.style.color = "white";
            
            var firstop = document.querySelector(".first-op")
            firstop.style.display = "flex";
            this.setState({to: event.target.className})
        }
        else{
            Swal.fire({
                type:'warning',
                icon:"warning",
                title: `¿Do you want to stop affecting ${this.state.to} and start affecting ${event.target.className}?`,
                showConfirmButton:true,
                showDenyButton:true,
                confirmButtonText:"Yes"
            }).then(async (value)=>{
                if(value.isConfirmed){
                    document.querySelector(`.${this.state.to}`).style.color = "black"
                    await(this.setState({to: event.target.className}));
                    this.handleFirstOp(event)
                    
                    }
                }
            )
            
        }
    }

    //This function, need a backEnd part, specifyng that the user has left the session.
    handleLogOut(){
        Swal.fire({
            title: 'Are you sure?',
            text: "You are going to Log Out",
            type: 'warning',
            showDenyButton:true,
            showConfirmButton:true,
            confirmButtonText:"Yes"
          }).then((value) =>{
            if(value.isConfirmed){
                window.location.href = "/admin"
            }
          })
    }

    }



export default AdminHub;


class FirstOp extends Component{
    constructor(props){
        super(props);
        this.state = {type: "", first_field:"", second_field:"", thirst_field:"",fourth_field:"", fifth_field:"", sixth_field:""};
        

        this.handleButtonCatLang = this.handleButtonCatLang.bind(this);
        this.handleFirstField = this.handleFirstField.bind(this);
        this.handleSecondField = this.handleSecondField.bind(this);
        

           
    }

    render(){

        //Como tienen el mismo ABM uso el mismo código para los dos
        if(this.props.to === "Category" || this.props.to === "Language"){
            return(
                <div className="CateLan-container">
                    <div className="CateLan-box">
                        <form className="CateLan-form add">
                            <label className="inp" > Add {this.props.to}</label>
                            <input className="inp"placeholder="Enter name" required onChange={this.handleFirstField}></input>
                            <button className="add" onClick={this.handleButtonCatLang}>Submit</button>
                        </form>
                    </div>
                    <div className="CateLan-box">
                        <form className="CateLan-form delete">
                            <label className="inp">Delete {this.props.to}</label>
                            <input className="inp" placeholder="Enter name" required onChange={this.handleFirstField}></input>
                            <button className="delete" onClick={this.handleButtonCatLang}>Submit</button>
                    </form>
                    </div>
                    <div className="CateLan-box">
                        <form className="CateLan-form modify">
                            <label className="inp">Modify {this.props.to}</label>
                            <input className="inp" placeholder="Enter name" required onChange={this.handleFirstField}></input>
                            <input className="inp" placeholder="Enter new name" required onChange={this.handleSecondField}></input>
                            <button className="modify" onClick={this.handleButtonCatLang}>Submit</button>
                        </form>
                    </div>
                </div>
            );
        }

        if(this.props.to === "Word"){
            <div className="Word-Container"></div>
        }

    }
    //Hay que hacer una función que dependiendo el boton que se toque de los forms, hace lo que hace. 


    //Este botón se va a encargar de el ABM del category y word
    handleButtonCatLang(event){
        console.log(event.target.className)

        if(event.target.className === "modify"){
            /*We are going to, first grab the first field and use it to check if there is a category or 
            language that has the same name that the admin wrote. If this matches we are going to grab that register
            and change its name to the one in second Field.
            */
        }
        else{
            if(event.target.className === "add"){
                //Right here we are going to get the firstfield, and add it to the database
            }

            else if(event.target.className==="delete"){
                //Right here we are going to get the firstfield, and delete it from the database

            }
        }

    }


    handleFirstField(event){
        this.setState({first_field: event.target.value})
    }

    handleSecondField(event){
        this.setState({second_field: event.target.value})
    }

    

}



