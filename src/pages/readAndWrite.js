import { Component } from "react";
import "../style/homepage.css"
import "../style/raw.css"
import NavBar from "../components/navbar";
import GamesDisplay from "../components/gamesdisplay";
import WordRequester from "../util/requester/wordRequester";
import LanguageSelector from "../components/languageSelector";
import {FaCheck, FaTimes} from 'react-icons/fa';

class readAndWrite extends Component{

    wordRequester = new WordRequester();

    constructor(props){
        super(props)

        this.state = {language: "", category: "", difficulty: "", words:[], shownword:"", translations: [], wordInput: "", limit: undefined, answerCorrectly: null, correctAnswer: ""}

        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.showWords = this.showWords.bind(this)
        this.handleWordInput = this.handleWordInput.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
    }

    async componentDidMount(){
        await this.loadWords()
    }

    render(){
        console.log(this.state.wordInput)
        return(
            <div className="principal-container">
                <NavBar/>
                <GamesDisplay/>
                <LanguageSelector func={this.handleLanguageChange}/>
                <button className="raw-input" onClick={this.showWords}>Next Word</button>
                <div className="raw-input">{this.state.shownword}</div>
                <input className="raw-input" onChange={this.handleWordInput} value={this.state.wordInput}></input>
                <button className="raw-input" onClick={this.handleCheck}>Check</button>
                {this.state.answerCorrectly === true && <FaCheck className="raw-input" style={{color: 'green'}}/>}
                {this.state.answerCorrectly === false && <FaTimes className="raw-input" style={{color: 'red'}}/>}
                {this.state.answerCorrectly === true && <p className="raw-input">Well done!</p>}
                {this.state.answerCorrectly === false && <p className="raw-input">You answered incorrectly, the correct answer is "{this.state.correctAnswer}".</p>}
            </div>
        );
    }

    async loadWords(){
        const words = await this.wordRequester.getWords(this.state.language, this.state.category, this.state.difficulty, this.state.limit)
        this.setState({words: words}, async () => {if(this.state.words.length !== 0) this.showWords()})
    }

    handleLanguageChange(event){
        this.setState({language: event.target.value}, async() => {await this.loadWords()});
    }

    showWords(){
        const word = this.state.words[Math.floor(Math.random()*this.state.words.length)]
        this.setState({shownword: word.inEnglish})
        this.setState({translations: word.translations})
        this.setState({answerCorrectly: null})
        this.setState({correctAnswer: ""})
        this.setState({wordInput: ""})
    }

    handleWordInput(event){
        this.setState({wordInput: event.target.value})
    }

    handleCheck(){
        for (const translation in this.state.translations) {
            if (Object.hasOwnProperty.call(this.state.translations, translation)) {
                const element = this.state.translations[translation];
                this.setState({correctAnswer: element})
                if(element === this.state.wordInput){
                    this.setState({answerCorrectly: true})
                }
                else{
                    this.setState({answerCorrectly: false})
                }
            }
        }
    }
}


export default readAndWrite;