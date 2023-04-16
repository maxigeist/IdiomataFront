import { Component } from "react";
import languageRequester from "../util/requester/languageRequester";



class LanguageSelector extends Component{

    requester = new languageRequester();

    constructor(props){
        super(props)

        this.state = {languages: []}

        
        this.makeSelectOptions = this.makeSelectOptions.bind(this);
        this.makeLiOptions = this.makeLiOptions.bind(this);
    }

    async componentDidMount(){
        const languages = await this.requester.getAllLanguages();
        this.setState({languages: languages})
    }

    render(){
        return(
            <select required className="languages" onChange={this.props.func}>
                <option value="">Choose language</option>
                <this.makeSelectOptions/>
            </select>
        )
    }




        

        
    
        

    makeSelectOptions(){
        const options = this.state.languages.map((language, index) => (
            <option key={index} value={language}>{this.state.languages[index]}</option>
        ));
        return(
            options
        )
    }
}

export default LanguageSelector;