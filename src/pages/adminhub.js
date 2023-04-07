import { Component } from "react";
import "../style/adminpage.css"





class AdminHub extends Component{

    constructor(props){
        super(props)
        this.state = {type:""}

        this.handleFirstOp = this.handleFirstOp.bind(this);
    }
    render(){
        return(
            <body>
                <div className="Admin-options">
                    <h1 className="h1-title">ABM</h1>
                        <h2 className="h1-title">¿Who do you want to modify?</h2>
                        <label className="Category" id="label"onClick={this.handleFirstOp}>Category</label> 
                        <label className="Word"id="label" onClick={this.handleFirstOp}>Word</label>
                        <label className="Language" id="label" onClick={this.handleFirstOp}>Language</label>
                        <label className="User" id="label" onClick={this.handleFirstOp}>User</label>
                </div>
                        <div className="div-2"><FirstOp type = {this.state.type} className="first-op"></FirstOp></div>
                        <SecondOp className="princ-container"></SecondOp>                    
            
            </body>
        );
        }
    handleFirstOp(event){
        if(this.state.type === "" || this.state.type === event.target.className){
            var getclass = event.target.className;
            var label = document.querySelector(`.${getclass}` ) 
            label.style.color = "white";
            
            var firstop = document.querySelector(".first-op")
            firstop.style.display = "flex";
            this.setState({type: event.target.className})
        }
        else{
            alert("You are already doing an action, refresh page!!")
        }
    }

    }



export default AdminHub;


class FirstOp extends Component{
    constructor(props){
        super(props);
        this.state = {to: ""};
        
        this.handleSecondOp = this.handleSecondOp.bind(this);
    }

    render(){

            return(
                <div className="first-op">
                    <h2 className="h1-title">¿What do you want to do?</h2>
                    <div className="opt">
                    <p className="User" id="lista-1"onClick={this.handleSecondOp}>User</p>
                    <p className="Category" id="lista-1" onClick={this.handleSecondOp}>Category</p> 
                    <p className="Word" id="lista-1" onClick={this.handleSecondOp}>Word</p>
                    </div>
                </div>
            );
    }

    //Habría que llenarlo aca adentro de ifs en base a las opciones que tiene la persona
    //ya sea que eligió, o palabra o user o category

    

    handleSecondOp(event){
        if(this.state.to === "" || this.state.to === event.target.className){
            var getclass = event.target.className;
            var p = document.querySelector(`.${getclass}` ) 
            p.style.color = "white";
            this.setState({to: event.target.className})

            

        
            
        }
        else{
            alert("You are already doing an action, refresh page!!")
        }
        



    }
}

class SecondOp extends Component{
    constructor(props){
        super(props)
    }

    //Esto hay que modificarlo bien ya que hay que hacer todas las cajitas. 

    render(){
        return(
            <div className="princ-container">
                <div className="delete-cont">
                <input placeholder="Ingrese el Id" required></input>
                </div>

            </div>

        );
    }

}
