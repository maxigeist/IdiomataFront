import { Component } from "react";
import "../style/homepage.css"
import "../style/raw.css"
import NavBar from "../components/navbar";
import GamesDisplay from "../components/gamesdisplay";
import WordRequester from "../util/requester/wordRequester";
import LanguageSelector from "../components/languageSelector";

class readAndWrite extends Component{

    wordRequester = new WordRequester();

    async loadWords(){
        const words = await this.wordRequester.getWords(this.state.language, this.state.category, this.state.difficulty)
        this.setState({words: words})
    }

    constructor(props){
        super(props)

        this.state = {language: "", category: "", difficulty: "", words:[], shownword:""}

        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.showWords = this.showWords.bind(this)
    }

    render(){
        console.log(this.state.language)
        console.log(this.state.shownword)
        return(
            <div className="principal-container">
                <NavBar/>
                <GamesDisplay/>
                <div required onChange={this.handleLanguageChange}>
                    <LanguageSelector/>
                </div>
                <div>{this.state.shownword}</div>
                <input className="raw-input"></input>
            </div>
        );
    }

    handleLanguageChange(event){
        this.setState({language:event.target.value});
        this.loadWords();
    }

    showWords(){
        const word = this.state.words[Math.floor(Math.random()*this.state.words.length)]
        this.setState({shownword: word.inEnglish})
    }
}


export default readAndWrite;