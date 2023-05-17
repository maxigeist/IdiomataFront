import React from "react"
import LanguageSelector from "../../components/languageSelector"
import { SentenceRequester } from "../../util/requester/sentenceRequester"
import { alert } from "../../util/alert";

const sentenceRequester = new SentenceRequester();

export class Sentence extends React.Component{

    render(){
        return(
            <div className="row">
                <SentenceWorkspace/>
                <SearchSentence/>
            </div>
        )}
}

class SentenceWorkspace extends React.Component{

    constructor(props){
        super(props)

        this.state = {languageSelected: "", currentPart: "", parts: [], currentAnswer: "", answers: []}

        this.handleCurrentPartChange = this.handleCurrentPartChange.bind(this)
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handlePartSubmit = this.handlePartSubmit.bind(this)
        this.handlePartRemove = this.handlePartRemove.bind(this)
        this.handleCurrentAnswerChange = this.handleCurrentAnswerChange.bind(this)
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this)
        this.handleAnswerRemove = this.handleAnswerRemove.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        return(
            <div className="container col-3">
                <div className="card">
                    <h4 className="card-header">Sentence Workspace</h4>
                    <div className="p-2">

                        <div>
                            <b>Sentence: </b>
                            {this.state.parts.map((part, index) => {
                            if(index !== this.state.parts.length - 1) return part + "___"
                            else {return part}
                            })}
                        </div>

                        <label className="form-label">Enter new part</label>
                        <input className="form-control shadow-none" onChange={this.handleCurrentPartChange}/>
                        <button className="btn btn-outline-primary me-2" onClick={this.handlePartSubmit}>Add</button>
                        <button className="btn btn-outline-danger" onClick={this.handlePartRemove}>Remove</button>
                        <br/>
                        <br/>

                        <div>
                            <b>Answers: </b>
                            {this.state.answers.map((answer, index) => {
                            if(index !== this.state.answers.length - 1) return " " + answer + ','
                            else {return " " + answer}
                            })}
                        </div>

                        <label className="form-label">Enter answer (in english)</label>
                        <input className="form-control shadow-none" onChange={this.handleCurrentAnswerChange}/>
                        <button className="btn btn-outline-primary me-2" onClick={this.handleAnswerSubmit}>Add</button>
                        <button className="btn btn-outline-danger" onClick={this.handleAnswerRemove}>Remove</button>
                        <br/>
                        <br/>

                        <LanguageSelector func={this.handleLanguageChange}/>

                        <br/>
                        
                        <button className="btn btn-success m-1 fs-5 w-25" onClick={this.handleSubmit}><i class="bi bi-plus-square"></i></button>
                    </div>
                </div>
            </div>
        )
    }

    handleLanguageChange(event){
        this.setState({languageSelected: event.target.value})
    }

    handleCurrentPartChange(event){
        this.setState({currentPart: event.target.value})
    }

    handlePartSubmit(event){
        const newParts = this.state.parts
        newParts.push(this.state.currentPart)

        this.setState({parts: newParts})
    }

    handlePartRemove(){
        const newParts = this.state.parts
        newParts.pop()

        this.setState({parts: newParts})
    }  

    handleCurrentAnswerChange(event){
        this.setState({currentAnswer: event.target.value})
    }

    handleAnswerSubmit(){
        const newAnswers = this.state.answers
        newAnswers.push(this.state.currentAnswer)

        this.setState({answers: newAnswers})
    }

    handleAnswerRemove(){
        const newAnswers = this.state.answers
        newAnswers.pop()

        this.setState({answers: newAnswers})
    }   

    async handleSubmit(){
        const res = await sentenceRequester.createSentence(this.state.languageSelected, this.state.parts, this.state.answers)

        if(res !== 200){
            alert('error', "Something went wrong", "")
        }else{
            alert('success', 'Sentence added succesfully', "")
        }
    }
}

class SearchSentence extends React.Component{
    constructor(props){
        super(props)

        this.state = {languageSelected: "", sentences:[]}

        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    render(){
        return (
            <div className="container col-3">
                <div className="card">
                    <h4 className="card-header">Search Sentence</h4>
                    
                    <div className="p-2">
                        <LanguageSelector func={this.handleLanguageChange}/>

                        <SearchResult sentences={this.state.sentences}/>
                    </div>
                </div>
            </div>
        )
    }

    handleLanguageChange(event){
        this.setState({languageSelected: event.target.value})

        this.handleSearch(event.target.value)
    }

    async handleSearch(language){
        const response = await sentenceRequester.searchSentence(language)

        this.setState({sentences: response})
    }
}

export class SearchResult extends React.Component{
    constructor(props){
        super(props)

        this.parseSentences = this.parseSentences.bind(this)
    }

    render(){
        if(!this.props.sentences) return ""
        if(this.props.sentences.length === 0) return ""

        return(
            <div>
                {this.parseSentences()}
            </div>
        )
    }
    
    parseSentences(){
        const result = []

        this.props.sentences.forEach(sentence => {
            const parts = []
            const blanks = []
            sentence.parts.forEach((part, index) => {
                parts.push(part.content)
            })
            sentence.blanks.forEach((blank, index) => {
                blanks.push(blank.word.inEnglish)
            })
            result.push({parts: parts.join("__"), answers: blanks.join(','), id: sentence.id})
        });

        return this.makeListOptions(result)
    }

    makeListOptions(result){
        if(this.props.sentences.length === 0) return ""

        const options = result.map((sentence, index) => (<li className="list-group-item " id={sentence.id} onClick={this.makeActive} key={index} style={{userSelect:"none"}}>- sentence: {sentence.parts}  answers: {sentence.answers}</li>))
        return options
    }
}