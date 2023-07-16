import { Component } from "react";
import "../style/homepage.css"
import "../style/raw.css"
import WordRequester from "../util/requester/wordRequester";
import { StatsRequester } from "../util/requester/statsRequester";
import { pageAuth } from "../util/pageAuth";
import Swal from "sweetalert2";
import DifficultySelector from "../components/difficultySelector";
import UserRequester from "../util/requester/userRequester";
import CategorySelectorWithImages from "../components/categorySelectorWithImages";
import Progressbar from "../util/progressbar.js";




class ReadAndWrite extends Component{

    wordRequester = new WordRequester();
    statsRequester = new StatsRequester();
    userRequester = new UserRequester();

    constructor(props){
        super(props)
        this.t = this.props.t;

        this.handleAuth()

        this.state = {language: "", category: "", difficulty: "", words:[], shownword:"", translations: [], wordInput: "", limit: undefined, answerCorrectly: null, correctAnswer: "", validation: "", showGame: false}

        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
        this.showWords = this.showWords.bind(this)
        this.handleWordInput = this.handleWordInput.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
    }

    async componentDidMount(){
        await this.loadWords()
    }

    render(){
        if(this.state.showGame){
        return(
            
            <div>
                <CategorySelectorWithImages func={this.handleCategoryChange}/>
                

            <div className="principal-container w-100 h-100">
                
            

                <div className="container p-4 col-6">
                    <div className="card" style={{ border:"none"}}>
                        <h4 className="card-header text-white bg-primary">{this.t("global:header:Translate-it")}</h4>
                        <div className="card-body ">
                            <div className="container">
                                <div className="row">
                                <div className="col">
                                    <DifficultySelector func={this.handleDifficultyChange} t={this.t}/>
                                </div>
                                </div>
                                
                            </div>
                            <form onSubmit={this.handleCheck}>
                            <div className="form-label">{this.state.shownword}</div>
                            <input className={"form-control shadow-none " + this.state.validation} onChange={this.handleWordInput} value={this.state.wordInput}></input>
                            </form>
                            <br/>

                            {this.state.answerCorrectly === false && <p className="">{this.t('global:header:You-answered-incorrectly-the-correct-answer-is')}"{this.state.correctAnswer}".</p>}
                            <button className="btn btn-success m-2" onClick={this.handleCheck}>{this.t("global:header:Check")}</button>
                            <button className="btn btn-primary" onClick={this.showWords}>{this.t("global:header:Next-word")}</button>
                        </div>
                    
                    </div>

                    
                </div>
                <div className="container p-4 col-10">
                <Progressbar className="w-100" count="20"></Progressbar>

                </div>
                
            </div>
            </div>
        );
        }
        
        
        else{
            return(
                <div>
                    <CategorySelectorWithImages func={this.handleCategoryChange}/>
                </div>
            )
        }
    }

    async loadWords(){
        const language = await this.userRequester.getUserLanguage();
        this.setState({language: language.language})
        const words = await this.wordRequester.getWords(language.language, this.state.category, this.state.difficulty, this.state.limit)
        this.setState({words: words}, async () => {if(this.state.words.length !== 0) this.showWords()})
    }

    handleCategoryChange(event){
        this.setState({category: event.target.value}, async() => {await this.loadWords()});
        this.setState({showGame: true})
    }

    handleDifficultyChange(event){
        this.setState({difficulty: event.target.value}, async()=> {await this.loadWords()});
    }

    showWords(){
        const word = this.state.words[Math.floor(Math.random()*this.state.words.length)]
        if(this.state.language)
            this.setState({shownword: word.inEnglish});
        this.setState({translations: word.translations})
        this.setState({answerCorrectly: null})
        this.setState({correctAnswer: ""})
        this.setState({wordInput: ""})
        this.setState({validation: ""})
    }

    handleWordInput(event){
        this.setState({wordInput: event.target.value})
    }

    async handleCheck(event){
        event.preventDefault();
        for (const translation in this.state.translations) {
            if (Object.hasOwnProperty.call(this.state.translations, translation)) {
                const translationObj = this.state.translations[translation]
                const translated = translationObj.translated;
                this.setState({correctAnswer: translated})
                if(translated === this.state.wordInput){
                    this.setState({answerCorrectly: true})
                    this.setState({validation: 'is-valid'})
                    await this.statsRequester.sendWordAttempt(this.state.shownword, this.state.language, translationObj.id, true, "TranslateIt")
                    return
                }
            }
        }
        await this.statsRequester.sendWordAttempt(this.state.shownword, this.state.language, null, false, "TranslateIt")
        this.setState({answerCorrectly: false})
        this.setState({validation: 'is-invalid'})

    }

    //If user token is not valid, redirects to login page
    async handleAuth(){
        const invalid = await pageAuth();
        if(invalid)
            Swal.fire({
                icon: "warning",
                titleText: this.t("global:header:Session-expired"),
                text: this.t("global:header:You-must-login-again"),
                position:"top",
                padding: "3em 3em 3em 3em"
            }).then(() => {window.location.href = "/";})      
    }
}


export default ReadAndWrite;