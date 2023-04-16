import { Component } from "react";
import categoryRequester from "../../util/requester/categoryRequester";
import languageRequester from "../../util/requester/languageRequester";
import Swal from "sweetalert2";
import LanguageSelector from "../../components/languageSelector";






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
        this.setState({languages: languages})
        const categories = await categorydataRequester.getAllCategories();
        this.setState({categories: categories})
    }

    render(){
        return(
            
                <this.makeLiOptions/>
            
        );
    }

    async handleAddButton(event){
        event.preventDefault()
        Swal.fire({
            title:`Insert new ${this.props.to}`,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then(result => {
            if(result.value){
                (this.props.to === "Category") ? categorydataRequester.createCategory(result.value) : languagedataRequester.createLanguage(result.value);
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
            (this.props.to === "Category") ? categorydataRequester.deleteCategory(this.state.active) : languagedataRequester.deleteLanguage(this.state.active);
        
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


    async handleModifyButton(event){
        event.preventDefault()
        Swal.fire({
            title:`Insert new name for the ${this.props.to}`,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then(result => {
            if(result.value){
                (this.props.to === "Category") ? categorydataRequester.modifyCategory(this.state.active, result.value) : languagedataRequester.modifyLanguage(this.state.active,result.value);
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
                    {/* <LanguageSelector type="li" func={this.makeActive}/> */}
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

    //Hay que ver una forma de poder refrescar la tabla, porque si no, no se actualiza.

    async refresh(){
        this.inactiveElements();
        await this.componentDidMount();
        
        
        


        // document.querySelector(".li-options").replace(<this.makeLiOptions/>);
        
        // window.location.reload();
        // return(
        //     <CateLan to={this.props.to}/>
        // );
        
        
        
        // this.componentDidMount();
        // this.makeActive();
        
        
        // this.forceUpdate();
        // // x.style.display = "block";
    }
    // forceUpdte(event){
    //     event.preventDefault();
    //     this.forceUpdate();
    // }

    inactiveElements(){
        document.querySelectorAll(".list-group-item").forEach((element) => {
            element.classList.remove("active")
            }
        )

    }

}




export default CateLan;