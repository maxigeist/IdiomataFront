import { Component } from "react";
import "../style/homepage.css"
import "../style/raw.css"
import NavBar from "../components/navbar";
import GamesDisplay from "../components/gamesdisplay";
import WordRequester from "../util/requester/wordRequester";
import LanguageSelector from "../components/languageSelector";

class readAndWrite extends Component{

    wordRequester = new WordRequester();

    constructor(props){
        super(props)

        this.state = {language: "", category: "", difficulty: "", words:[], shownword:""}

        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.showWords = this.showWords.bind(this)
    }

    async componentDidMount(){
        await this.loadWords()
    }

    render(){
        return(
            <div className="principal-container">
                <NavBar/>
                <GamesDisplay/>
                <div required onChange={this.handleLanguageChange}>
                    <LanguageSelector/>
                </div>
                <div className="raw-input">{this.state.shownword}</div>
                <input className="raw-input"></input>
            </div>
        );
    }

    async loadWords(){
        const words = await this.wordRequester.getWords(this.state.language, this.state.category, this.state.difficulty)
        this.setState({words: words})
    }

    async handleLanguageChange(event){
        this.setState({language:event.target.value});
        await this.loadWords();
        this.showWords();
    }

    showWords(){
        const word = this.state.words[Math.floor(Math.random()*this.state.words.length)]
        console.log(word.inEnglish)
        this.setState({shownword: word.inEnglish})
    }
}


export default readAndWrite;