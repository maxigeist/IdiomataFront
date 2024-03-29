import { Component } from "react";

import DifficultySelector from "../components/difficultySelector";
import { SentenceRequester } from "../util/requester/sentenceRequester";
import "../style/fitg.css"
import { StatsRequester } from "../util/requester/statsRequester";
import UserRequester from "../util/requester/userRequester";

class FillInTheGaps extends Component{

    sentenceRequester = new SentenceRequester();
    statsRequester = new StatsRequester();
    userRequester = new UserRequester();

    constructor(props){
        super(props)
        this.state= ({language:"", category:"", difficulty:"", sentence_parts:[], sentence_blanks:[], shownParts: [], shownBlanks: [], inputs:[], answers: [], isCorrect:[], showAnswers: false})
        this.t = this.props.t;

        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
        this.nextSentence =  this.nextSentence.bind(this)
        this.showSentence =  this.showSentence.bind(this)
        this.loadSentences = this.loadSentences.bind(this)
        this.handleCheck = this.handleCheck.bind(this)

    }

    async componentDidMount(){
        await this.loadSentences()
    }



    render(){


        return(
            <div className="principal-container w-100 h-100">
                
            

            <div className="container p-4 col-6">
                <div className="card" style={{ border:"none"}}>
                    <h4 className="card-header text-white bg-primary">{this.t("global:header:Fill-in-the-gaps")}</h4>
                    <div className="card-body">
                    <div className="container">
                                <div className="row align-items-start">
                                <div className="col">
                                    <DifficultySelector func={this.handleDifficultyChange} t={this.t}/>
                                </div>

                                </div>
                                
                            </div>

                        <form onSubmit={this.handleCheck} className="pt-3">
                            <this.showSentence shownParts={this.state.shownParts} shownBlanks={this.state.shownBlanks} isCorrect={this.state.isCorrect}/>
                        </form>

                        {this.state.showAnswers && this.state.shownBlanks.map((blank, index) => {return <p>{(index+1)+". "+blank[1]}</p>})}
                                        
                        
                        <button className="btn btn-success m-2" onClick={this.handleCheck}>{this.t("global:header:Check")}</button>
                        <button className="btn btn-primary" onClick={this.nextSentence}>{this.t("global:header:Next-sentence")}</button>
                    </div>
                
                </div>
            </div>
        </div>

        );
    }



    async loadSentences(){
        const language = await this.userRequester.getUserLanguage();
        this.setState({language: language.language})
        console.log(language.language)
        const sentences = await this.sentenceRequester.searchSentence(language.language, this.state.difficulty)
        if(sentences.length > 0){
            const final_sentences = []
            const final_blanks = []
            for(var j = 0; j< sentences.length;j++){
                var sentence = []
                var blanks = []
                for(var i=0; i<sentences[j].parts.length; i++){
                    sentence[i] = sentences[j].parts[i].content
                }
                for(var k = 0; k < sentences[j].blanks.length; k++){
                    blanks[k] = sentences[j].blanks[k]
                }
                
                final_sentences.push(sentence)
                
                final_blanks.push(blanks)
            }
            
        
        this.setState({sentence_parts: final_sentences, sentence_blanks: final_blanks}, async () => {if(this.state.sentence_parts.length !== 0) this.nextSentence()})
        
        }
    }


    handleLanguageChange(event){
        this.setState({language: event.target.value}, async() => {await this.loadSentences()});
        
    }

    handleCategoryChange(event){
        
        this.setState({category: event.target.value}, async() => {await this.loadSentences()});
    }
    handleDifficultyChange(event){
        
        this.setState({difficulty: event.target.value}, async()=> {await this.loadSentences()});
    }
    
    nextSentence(){

        if(this.state.sentence_parts.length !==  0){

            var index = Math.floor(Math.random()*this.state.sentence_parts.length)
            const shownParts = this.state.sentence_parts[index]
            const shownBlanks = this.state.sentence_blanks[index]
            

            this.setState({shownParts: shownParts, shownBlanks: shownBlanks})

        }
        
        this.setState({isCorrect:[], showAnswers: false})
        try{
            var inputs = document.querySelectorAll(".input-answer")
            inputs.forEach(function(element) {
                    element.value = ""
                });
        }
        catch(e){
            return
        }

    }

    showSentence(props){
        const elements = [];
        for (let i = 0; i < props.shownParts.length; i+=1) {
            if(i === props.shownParts.length - 1){
                elements.push(
                    
                        <p className="paragraphs">{props.shownParts[i]}</p>
                    
                );
            }else{
                elements.push(
                
                    <p className="paragraphs">{props.shownParts[i]}
                    <input onChange={(event) => {this.handleAnswerChange(event, i)}} className={"input-answer form-control shadow-none " + props.isCorrect[i]}/></p>
                
            );
            }
            
        }

        return <div><p style={{textAlign:"justify"}}>{elements}</p></div>;
    }

    handleAnswerChange(event, index){
        const newAnswers = this.state.answers
        newAnswers[index] = event.target.value
        this.setState({answers: newAnswers})
    }

    handleCheck(event){
        event.preventDefault();
        let answerIndex = 0;
        console.log(this.state.shownBlanks)
        this.state.answers.forEach((answer, index) => {
            if(answer){
                const inEnglish = this.state.shownBlanks[answerIndex][0]
                const translations = this.state.shownBlanks[answerIndex].slice(1)
                for(let i = 0; i < translations.length; i++){
                    if(translations[i] === answer){
                        const newIsCorrect = this.state.isCorrect
                        newIsCorrect[index] = "is-valid"
                        this.setState({isCorrect: newIsCorrect})
                        this.statsRequester.sendWordAttempt(inEnglish, this.state.language, null, true, "FillInTheGaps")
                        answerIndex ++;
                        //this return exits the current execution of the foreach, not the entire function
                        return
                    }
                }
                const newIsCorrect = this.state.isCorrect
                newIsCorrect[index] = "is-invalid"
                this.setState({isCorrect: newIsCorrect})
                this.statsRequester.sendWordAttempt(inEnglish, this.state.language, null, false, "FillInTheGaps")
                answerIndex ++;
                this.setState({showAnswers: true})
            }
        })
    }
}

export default FillInTheGaps;