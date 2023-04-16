import { Component } from "react";
import languageRequester from "../util/requester/languageRequester";

class LanguageSelector extends Component{

    requester = new languageRequester();

    constructor(props){
        super(props)

        this.state = {languages: []}

        this.makeSelectOptions = this.makeSelectOptions.bind(this)
        this.handleLanguageChange = this.handleLanguageChange.bind(this)

    }

    async componentDidMount(){
        const languages = await this.requester.getAllLanguages();
        this.setState({languages: languages})
    }

    render(){
        return(
            <select required className="raw-input" onChange={this.handleLanguageChange}>
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

    handleLanguageChange(event){
        const language = event.target.value;
        this.props.handleLanguageChange(language);
    }
}

export default LanguageSelector;