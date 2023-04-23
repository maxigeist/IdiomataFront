import { Component } from "react";
import categoryRequester from "../../util/requester/categoryRequester";
import languageRequester from "../../util/requester/languageRequester";
import Swal from "sweetalert2";







const categorydataRequester = new categoryRequester();
const languagedataRequester = new languageRequester();






class CateLan extends Component{

    constructor(props){
        super(props);
        this.state = {active:"", languages:[], categories:[]};

        
        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleModifyButton = this.handleModifyButton.bind(this);
        this.refresh = this.refresh.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        
        this.makeLiOptions = this.makeLiOptions.bind(this);
        this.makeActive = this.makeActive.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
    }

    async componentDidMount(){
        const languages = await languagedataRequester.getAllLanguages();
        const categories = await categorydataRequester.getAllCategories();
        this.setState({languages: languages})
        this.setState({categories: categories})
    }

    render(){
        return(
                <this.makeLiOptions/>
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
                
                
            }
            this.refresh();
            

        })
        
        }
        

    async handleDeleteButton(event){
        event.preventDefault()
        try{
            (this.props.to === "Category") ? await categorydataRequester.deleteCategory(this.state.active) : await languagedataRequester.deleteLanguage(this.state.active);
        
        Swal.fire({
            icon :"success",
            title : `The ${this.props.to} was deleted`,
            timer:3000
        })
        
        }
        catch(error){
            console.log("error")
        }
        this.refresh();
        
        
    }


    handleModifyButton(event){
        event.preventDefault()
        Swal.fire({
            title:`Insert new name for the ${this.props.to}`,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then(async result => {
            if(result.value){
                (this.props.to === "Category") ? await categorydataRequester.modifyCategory(this.state.active, result.value) : await languagedataRequester.modifyLanguage(this.state.active,result.value);
                Swal.fire({
                    icon: 'success',
                    titleText: `Name of the ${this.props.to} changed`,
                    position:"top",
                    padding: "3em 3em 3em 3em"
                })
                
            }
            this.refresh();
            
            
        })
        
    }


    makeLiOptions(){    
        var options ="";
        if(this.props.to === "Language"){
            options = this.state.languages.map((language, index) => (
            
            <li className="list-group-item " id={language}onClick={this.makeActive}key={index} value={language}>{this.state.languages[index]}</li>
            
        ));
        }
        else{
            options = this.state.categories.map((category, index) => (
                <li className="list-group-item " id={category}onClick={this.makeActive}key={index} value={category}>{this.state.categories[index]}</li>
            ));
        }

    
        return(
            <div class="d-flex div-1 col-sm">
                <div class="w-25 ms-5">
                    <ul className="list-group">
                    {options}
                    
                    </ul>
                </div>
                <div class="row-cols-lg-5 w-25">
                <button class="btn btn-danger fs-5 bts" onClick={this.handleDeleteButton}><i class="bi bi-trash"></i></button>
                <button class= "btn btn-secondary fs-5 bts" onClick={this.handleModifyButton}><i class="bi bi-pencil"></i></button>
                <button class= "btn btn-success fs-5 bts" onClick={this.handleAddButton}><i class="bi bi-plus-square"></i></button>
                                                
                </div>

            </div>
            
            
        )
    }

    async makeActive(event){
        this.inactiveElements();
        event.target.classList.add("active");
        await this.setState({active: event.target.id});
    }

    async refresh(){
        this.inactiveElements();
        await this.componentDidMount();
        
    }
    
    inactiveElements(){
        document.querySelectorAll(".list-group-item").forEach((element) => {
            element.classList.remove("active")
            }
        )

    }

}




export default CateLan;