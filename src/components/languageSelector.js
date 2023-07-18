import { Component } from "react";
import languageRequester from "../util/requester/languageRequester";



class LanguageSelector extends Component{

    requester = new languageRequester();

    constructor(props){
        super(props)
        this.t = this.props.t

        this.state = {languages: []}

        this.componentDidMount = this.componentDidMount.bind(this)
        this.makeSelectOptions = this.makeSelectOptions.bind(this);
    }

    async componentDidMount(){
        const languages = await this.requester.getAllLanguages();
        this.setState({languages: languages})
     
    }

    render(){
        return(
            <select required className="form-select shadow-none lan-selector" style={{margin:`${this.props.margin}`, width:`${this.props.width}`}}onChange={this.props.func} >
                <option value="">{this.t("global:header:Language")}</option>
                <this.makeSelectOptions/>
            </select>
        );
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