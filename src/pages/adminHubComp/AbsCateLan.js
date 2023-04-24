import { Component } from "react";
import categoryRequester from "../../util/requester/categoryRequester";
import languageRequester from "../../util/requester/languageRequester";
import Swal from "sweetalert2";
import { alert } from "../../util/alert";







const categorydataRequester = new categoryRequester();
const languagedataRequester = new languageRequester();






class AbsCateLan extends Component{

    constructor(props){
        super(props);

        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleModifyButton = this.handleModifyButton.bind(this);
        
        
        }



    render(){
        return(
            <div class="row-cols-lg-5 w-25">
                <button class="btn btn-danger fs-5 bts" onClick={this.handleDeleteButton}><i class="bi bi-trash"></i></button>
                <button class= "btn btn-secondary fs-5 bts" onClick={this.handleModifyButton}><i class="bi bi-pencil"></i></button>
                <button class= "btn btn-success fs-5 bts" onClick={this.handleAddButton}><i class="bi bi-plus-square"></i></button>                 
            </div>

                
        );
    }

    handleAddButton(event){
        event.preventDefault()
        Swal.fire({
            title:`Insert new ${this.props.to}`,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then(async result => { 
            if(result.value){
                (this.props.to === "Category") ? await categorydataRequester.createCategory(result.value) : await languagedataRequester.createLanguage(result.value);
                Swal.fire({
                    icon: 'success',
                    titleText: `New ${this.props.to} created`,
                    position:"top",
                    padding: "3em 3em 3em 3em"
                })   
                this.props.refresh();
            }
            
            

        })
        
        }
        

    async handleDeleteButton(event){
        if(this.checkActive()){
            event.preventDefault()
            try{
                (this.props.to === "Category") ? await categorydataRequester.deleteCategory(this.props.active) : await languagedataRequester.deleteLanguage(this.props.active);
            
            Swal.fire({
                icon :"success",
                title : `The ${this.props.to} was deleted`,
                timer:3000
            })
            this.props.refresh();
            
            }
            catch(error){
                console.log("error")
            }
            
            
            
            
        }
    }


    handleModifyButton(event){
        if(this.checkActive()){
            event.preventDefault()
            Swal.fire({
                title:`Insert new name for the ${this.props.to}`,
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
            }).then(async result => {
                if(result.value){
                    (this.props.to === "Category") ? await categorydataRequester.modifyCategory(this.props.active, result.value) : await languagedataRequester.modifyLanguage(this.props.active,result.value);
                    Swal.fire({
                        icon: 'success',
                        titleText: `Name of the ${this.props.to} changed`,
                        position:"top",
                        padding: "3em 3em 3em 3em"
                    })
                    this.props.refresh();
                    
                }
                
                
                
            })
        }

    }


    //This method checks if there is an active element selected, if not it will not continue with the request
    checkActive(){
        if(this.props.active !== ""){
            return true;
        }
        else{
            return alert("error", `Please select a ${this.props.to}`)
        }
    }

}




export default AbsCateLan;