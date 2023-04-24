import { Component } from "react";
import languageRequester from "../../util/requester/languageRequester";
import AbsCateLan from "./AbsCateLan";

const languagedataRequester = new languageRequester();

class Language extends Component{
    constructor(props){

        super(props);
        this.state = {active:"", languages:[]};

        

        this.refresh = this.refresh.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.inactiveElements = this.inactiveElements.bind(this);
        this.makeLiOptions = this.makeLiOptions.bind(this);
        this.makeActive = this.makeActive.bind(this);
        }

    async componentDidMount(){
        const languages = await languagedataRequester.getAllLanguages();
        this.setState({languages: languages})

    }
    render(){
        return(
                <this.makeLiOptions/>
        );
    }
    makeLiOptions(){    
        var options ="";
        options = this.state.languages.map((language, index) => (
            
            <li className="list-group-item " id={language} onClick={this.makeActive} key={index} value={language}>{this.state.languages[index]}</li>
        ));

            
        
        return(

            <div class="d-flex div-1 col-sm">
                <div class="w-25 ms-5">
                    <ul className="list-group">
                    {options}
                    
                    </ul>
                </div>
                <AbsCateLan to="Language" active={this.state.active} refresh={this.refresh}/>


        </div>
            
        )
        
    
    }
    async makeActive(event){
        if (event.target.classList.contains("active")){
            event.target.classList.remove("active");
            await this.setState({active: ""});
            
        }
        else{
            this.inactiveElements();
            event.target.classList.add("active");
            await this.setState({active: event.target.id});
            
        }
        
    }

    inactiveElements(){
        document.querySelectorAll(".list-group-item").forEach((element) => {
            element.classList.remove("active")
            }
        )

    }
    async refresh(){
        this.inactiveElements();
        await this.componentDidMount();
        
    }
    

}
export default Language;