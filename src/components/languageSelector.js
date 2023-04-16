import { Component } from "react";
import languageRequester from "../util/requester/languageRequester";



class LanguageSelector extends Component{

    requester = new languageRequester();

    constructor(props){
        super(props)

        this.state = {languages: [], chosen:""}
        this.componentDidMount = this.componentDidMount.bind(this);
        this.makeSelectOptions = this.makeSelectOptions.bind(this);
        this.makeLiOptions = this.makeLiOptions.bind(this);
    }

    async componentDidMount(){
        const languages = await this.requester.getAllLanguages();
        this.setState({languages: languages})
        
    }

    render(){
        if(this.props.type === "option"){
            return(
                <select required className="languages" onChange={this.props.func}>
                    <option value="">Choose language</option>
                    <this.makeSelectOptions/>
                </select>
                )
            }

        else if(this.props.type === "li"){ 
            return(
                <this.makeLiOptions/>
            )


        

        }
    }
        

    makeSelectOptions(){
        const options = this.state.languages.map((language, index) => (
            <option key={index} value={language}>{this.state.languages[index]}</option>
        ));
        return(
            options
        )
    }

    makeLiOptions(){
        const options = this.state.languages.map((language, index) => (
    
        <li className="list-group-item" id={language} onClick={this.props.func}key={index} value={language}>{this.state.languages[index]}</li>
        ));
        return(
        
            options
            
        )

    }


}

export default LanguageSelector;