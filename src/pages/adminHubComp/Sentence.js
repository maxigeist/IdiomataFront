import React from "react"
import LanguageSelector from "../../components/languageSelector"

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
                        
                        <button className="btn btn-success m-1 fs-5 w-25"><i class="bi bi-plus-square"></i></button>
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
}

class SearchSentence extends React.Component{
    render(){
        return (
            <div className="container col-3">
                <div className="card">
                    <h4 className="card-header">Search Word</h4>
                </div>
            </div>
        )
    }
}