import { Component } from "react";
import categoryRequester from "../../util/requester/categoryRequester";
import languageRequester from "../../util/requester/languageRequester";
import Swal from "sweetalert2";




const categorydataRequester = new categoryRequester();
const languagedataRequester = new languageRequester();





class CateLan extends Component{

    constructor(props){
        super(props);
        this.state = {first_field:"", second_field:""};

        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleModifyButton = this.handleModifyButton.bind(this);

        this.handleFirstField = this.handleFirstField.bind(this);
        this.handleSecondField = this.handleSecondField.bind(this);


    }

    render(){
        return(
            <div className="CateLan-container">
                <div className="CateLan-box">
                    <form className="CateLan-form add">
                        <label className="inp" > Add {this.props.to}</label>
                        <input className="inp"placeholder="Enter name" required onChange={this.handleFirstField}></input>
                        <button className="add" onClick={this.handleAddButton}>Submit</button>
                    </form>
                </div>
                <div className="CateLan-box">
                    <form className="CateLan-form delete">
                        <label className="inp">Delete {this.props.to}</label>
                        <input className="inp" placeholder="Enter name" required onChange={this.handleFirstField}></input>
                        <button className="delete" onClick={this.handleDeleteButton}>Submit</button>
                </form>
                </div>
                <div className="CateLan-box">
                    <form className="CateLan-form modify">
                        <label className="inp">Modify {this.props.to}</label>
                        <input className="inp" placeholder="Enter name" required onChange={this.handleFirstField}></input>
                        <input className="inp" placeholder="Enter new name" required onChange={this.handleSecondField}></input>
                        <button className="modify" onClick={this.handleModifyButton}>Submit</button>
                    </form>
                </div>

            </div>


        );
    }
    //Hay que hacer una función que dependiendo el boton que se toque de los forms, hace lo que hace. 

    //We have to put an if in each function beacuse we are going to use both of them for language and for category, so depending on 
    //the prop we are going to use each data requester. 
    async handleAddButton(event){
        event.preventDefault()
        try{
            (this.props.to === "Category") ? categorydataRequester.createCategory(this.state.first_field) : languagedataRequester.createLanguage(this.state.first_field);
            //I do an inline if to check if we are with category or with language

        Swal.fire({
            icon :"success",
            title : `The ${this.props.to} was created`,
            timer:3000
        }
        )

        }
        catch(error){
            console.log("error")
        }
    }

    handleDeleteButton(event){
        event.preventDefault()
        try{
            (this.props.to === "Category") ? categorydataRequester.deleteCategory(this.state.first_field) : languagedataRequester.deleteLanguage(this.state.first_field);
        
        Swal.fire({
            icon :"success",
            title : `The ${this.props.to} was deleted`,
            timer:3000
        }
        )

        }
        catch(error){
            console.log("error")
        }
        

    }


    handleModifyButton(event){
        event.preventDefault()
        try{
            (this.props.to === "Category") ? categorydataRequester.modifyCategory(this.state.first_field, this.state.second_field) : languagedataRequester.modifyLanguage(this.state.first_field, this.state.second_field);
        Swal.fire({
            icon :"success",
            title : `The ${this.props.to} was modifed`,
            timer:3000
        }
        )
        }
        catch(error){
            console.log("error")
        }
        


    }

    //Este botón se va a encargar de el ABM del category y word







    handleFirstField(event){
        this.setState({first_field: event.target.value})
    }

    handleSecondField(event){
        this.setState({second_field: event.target.value})
    }


}




export default CateLan;