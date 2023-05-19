import { Component } from "react";

import LanguageSelector from "../components/languageSelector";
import CategorySelector from "../components/categorySelector";
import DifficultySelector from "../components/difficultySelector";
import { SentenceRequester } from "../util/requester/sentenceRequester";

class FillInTheGaps extends Component{

    sentenceRequester = new SentenceRequester();


    constructor(props){
        super(props)
        this.state= ({language:"", category:"", difficulty:"", sentence_parts:[[]],sentence_blanks:[[]], shownSentence:""})


        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
        this.showSentence =  this.showSentence.bind(this)
        this.loadSentences = this.loadSentences.bind(this)

    }



    render(){


        return(
            <div className="principal-container w-100 h-100">
                
            

            <div className="container p-4 col-6">
                <div className="card" style={{ border:"none"}}>
                    <h4 className="card-header text-white bg-primary">Fill in the Gaps</h4>
                    <div className="card-body">
                    <div className="container">
                                <div className="row align-items-start">
                                <div className="col">
                                    <LanguageSelector func={this.handleLanguageChange}/>
                                </div>
                                <div className="col">
                                    <CategorySelector func={this.handleCategoryChange}/>
                                </div>
                                <div className="col">
                                    <DifficultySelector func={this.handleDifficultyChange}/>
                                </div>

                                </div>
                                
                            </div>
                        <form>
                        <div className="form-label"></div>
                           
                        
                        </form>
                        
                        <div>
                        <this.showSentence/>
                        </div>
                        <button className="btn btn-success m-2" >Check</button>
                        <button className="btn btn-primary" >Next Sentence</button>
                    </div>
                
                </div>
            </div>
        </div>

        );
    }


    async loadSentences(){
        const sentences = await this.sentenceRequester.searchSentence(this.state.language, this.state.category, this.state.difficulty, this.state.limit)
        if(sentences.length>0){
            const final_sentences = []
            const final_blanks = []
            for(var j = 0; j< sentences.length;j++){
                var sentence = []
                var blanks = []
                for(var i=0; i<sentences[j].parts.length; i++){
                    sentence[i] = sentences[j].parts[i].content
                }
                for(var k = 0; k < sentences[j].blanks.length;k++){
                    blanks[k] = sentences[j].blanks[k].word.inEnglish
                }
                
                final_sentences.push(sentence)
                
                final_blanks.push(blanks)
            }
            
        
        this.setState({sentence_parts: final_sentences, sentence_blanks: final_blanks}, async () => {if(this.state.sentence_parts.length !== 0) this.showSentence()})
        
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
    
    showSentence(){
        if(this.state.sentence_parts.length !==  0){
            var index = Math.floor(Math.random()*this.state.sentence_parts.length)
            const sentence = this.state.sentence_parts[index]

              
            const show_sentence = () => {
                const elements = [];
                for (var i = 0; i < sentence.length; i+=2) {
                  elements.push(
                    <div style={{display:"flex"}}>
                      <p>{sentence[i]}</p>
                      <input style={{border:"none", borderBottom:"2px solid", height:"25px", marginLeft:"5px"}}/>
                    </div>
                  );
                }
                return <div>{elements}</div>;
              };
          
              return show_sentence();
            }   




    }
}

export default FillInTheGaps;