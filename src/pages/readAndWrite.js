import { Component } from "react";
import "../style/homepage.css"
import "../style/raw.css"
import NavBar from "../components/navbar";
import GamesDisplay from "../components/gamesdisplay";
import WordRequester from "../util/requester/wordRequester";
import LanguageSelector from "../components/languageSelector";
//TODO remove unused packagae
import {FaCheck, FaTimes} from 'react-icons/fa';
import { StatsRequester } from "../util/requester/statsRequester";

class readAndWrite extends Component{

    wordRequester = new WordRequester();
    statsRequester = new StatsRequester();

    constructor(props){
        super(props)

        this.state = {language: "", category: "", difficulty: "", words:[], shownword:"", translations: [], wordInput: "", limit: undefined, answerCorrectly: null, correctAnswer: "", validation: ""}

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

                <div className="container col-3 p-4">
                    <div className="card">
                        <h4 className="card-header">Hello</h4>
                        <div className="card-body">
                            <LanguageSelector func={this.handleLanguageChange}/>
                            <div className="form-label">{this.state.shownword}</div>
                            <input className={"form-control shadow-none " + this.state.validation} onChange={this.handleWordInput} value={this.state.wordInput}></input>
                            <br/>

                            {this.state.answerCorrectly === false && <p className="">You answered incorrectly, the correct answer is "{this.state.correctAnswer}".</p>}
                            <button className="btn btn-outline-success m-2" onClick={this.handleCheck}>Check</button>
                            <button className="btn btn-primary" onClick={this.showWords}>Next Word</button>
                        </div>
                    
                    </div>
                </div>
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
        if(this.state.language)
            this.setState({shownword: word.inEnglish});
        this.setState({translations: word.translations})
        this.setState({answerCorrectly: null})
        this.setState({correctAnswer: ""})
        this.setState({wordInput: ""})
    }

    handleWordInput(event){
        this.setState({wordInput: event.target.value})
    }

    async handleCheck(){
        for (const translation in this.state.translations) {
            if (Object.hasOwnProperty.call(this.state.translations, translation)) {
                const translationObj = this.state.translations[translation]
                const translated = translationObj.translated;
                this.setState({correctAnswer: translated})
                if(translated === this.state.wordInput){
                    this.setState({answerCorrectly: true})
                    this.setState({validation: 'is-valid'})
                    await this.statsRequester.sendWordAttempt(this.state.shownword, translationObj.id, true)
                    return
                }
            }
        }
        await this.statsRequester.sendWordAttempt(this.state.shownword, null, false)
        this.setState({answerCorrectly: false})
        this.setState({validation: 'is-invalid'})

    }
}


export default readAndWrite;