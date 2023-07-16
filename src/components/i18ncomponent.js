import { Component } from "react";
import i18next from "i18next";
import global_es from "../translations/es/global.json"
import global_en from "../translations/en/global.json"
import global_it from "../translations/it/global.json"
import "../style/i18n.css"
import { initReactI18next } from 'react-i18next';
import { saveLanguageToDom} from "../util/domHandler"




i18next.init({
  interpolation: {escapeValue : false},
  lng:(localStorage.getItem("currentLanguage")),
  resources:{
    Español:{
      global: global_es
    },
    English:{
      global:global_en
    },
    Italiano:{
        global: global_it
    }
  }
});

initReactI18next.init(i18next);

class I18n extends Component{
    

    constructor(props){
        super(props);
        this.t = this.props.t;
        
        this.state = {languages: ["English", "Español", "Italiano"]}
        this.dict = {"Español":"🇪🇸", "English":"🇺🇸", "Italiano":"🇮🇹"}
            
        this.changeLanguage = this.changeLanguage.bind(this);
        this.makeSelectOptions = this.makeSelectOptions.bind(this);

        
        
    }

    render(){
        return(
            
            
            <select required className="select-box fs-3" onChange={this.changeLanguage} >
                <this.makeSelectOptions/>
            </select>
            
            
            
        );
    }


    makeSelectOptions(){
        for(var i=0; i<this.state.languages.length; i++){
            if(localStorage.getItem("currentLanguage") === this.state.languages[i]){
                [this.state.languages[0], this.state.languages[i]] = [this.state.languages[i], this.state.languages[0]];
                 
            }
        }  

        
        const options = this.state.languages.map((language, index) => (
            <option key={index} value={language}>{this.dict[language]} {this.state.languages[index]}</option>
            
        ));
        
            return(
                options
            )}
    

    
    changeLanguage(event){
        
        
        var lng = event.target.value;
        


        saveLanguageToDom(lng);
        
        
        
        

        
        window.location.href = "/"
        
            this.forceUpdate()
            
        
        
        
        
        
        
        
        // i18next.init({
        //     interpolation: {escapeValue : false},
        //     lng:(event.target.value),
        //     resources:{
        //       es:{
        //         global: global_es
        //       },
        //       en:{
        //         global:global_en
        //       }
        //     }
        //   });
        
        
        
        

    }
}
export default I18n;

