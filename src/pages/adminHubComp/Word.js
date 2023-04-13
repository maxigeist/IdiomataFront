import React from "react";
import { WordRequester } from "../../util/requester/wordRequester";

const wordRequester = new WordRequester()


export class Word extends React.Component{

    render(){
        return(
            <div className="row">
                <AddWord/>
                <AddTranslation/>
                <SearchWord/>
            </div>
        )}
}

class AddWord extends React.Component{
    constructor(props){
        super(props)

        this.state = {addWordInput: "", addWordCategory: ""}
        this.handleWordChange = this.handleWordChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        return (
        <div className="container col-3">
            <div className="card">
                <h4 className="card-header">Add Word</h4>
                <div className="p-2">
                    <label className="form-label">Enter word in english</label>
                    <input className="form-control shadow-none" onChange={this.handleWordChange}/>

                    <br/>

                    <select className="form-select shadow-none" onChange={this.handleCategoryChange}>
                        <option>Select Category</option>
                        <option value={"Sport"}>Sport</option>
                        <option value={"science"}>Science</option>
                    </select>

                    <br/>

                    <button className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    )}

    handleWordChange(event){
        this.setState({addWordInput: event.target.value})
    }

    handleCategoryChange(event){
        this.setState({addWordCategory: event.target.value})
    }

    async handleSubmit(){
        await wordRequester.createWord(this.state.addWordInput, this.state.addWordCategory)
    }
}

class AddTranslation extends React.Component{
    constructor(props){
        super(props)

        this.state = {word: "", translation: "", dif: "", lang: ""}

        this.handleWordChange = this.handleWordChange.bind(this)
        this.handleTranslationChange = this.handleTranslationChange.bind(this)
        this.handleDifChange = this.handleDifChange.bind(this)
        this.handleLangChange = this.handleLangChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render(){
        return (
            <div className="container col-3">
            <div className="card">
                <h4 className="card-header">Add Translation</h4>
                <div className="p-2">
                    <label className="form-label">Enter word in english</label>
                    <input className="form-control shadow-none" onChange={this.handleWordChange}/>

                    <br/>

                    <label className="form-label">Enter translation</label>
                    <input className="form-control shadow-none" onChange={this.handleTranslationChange}/>

                    <br/>

                    <select className="form-select shadow-none" onChange={this.handleDifChange}>
                        <option>Select Difficulty</option>
                        <option value={"HARD"}>Hard</option>
                        <option value={"MID"}>Medium</option>
                        <option value={"EASY"}>Easy</option>
                    </select>

                    <br/>

                    <select className="form-select shadow-none" onChange={this.handleLangChange}>
                        <option>Select Language</option>
                        <option value={"italian"}>Italian</option>
                        <option value={"spanish"}>Spanish</option>
                    </select>

                    <br/>

                    <button className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
                </div>
            </div>
        </div>
        )
    }

    handleWordChange(event){
        this.setState({word: event.target.value})
    }

    handleTranslationChange(event){
        this.setState({translation: event.target.value})
    }

    handleDifChange(event){
        this.setState({dif: event.target.value})
    }

    handleLangChange(event){
        this.setState({lang: event.target.value})
    }

    async handleSubmit(){
        wordRequester.addTranslation(this.state.word, this.state.translation, this.state.dif, this.state.lang)
    }
}

class SearchWord extends React.Component{

    constructor(props){
        super(props)

        this.state = {word: "", status: "",  category: "", translations: []}
    }

    render(){
        return (
            <div className="container col-3">
            <div className="card">
                <h4 className="card-header">Search Word</h4>
                <div className="p-2">
                    <label className="form-label">Enter word in english</label>
                    <input className="form-control shadow-none" onChange={this.handleWordChange}/>

                    <br/>

                    <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>

                </div>
            </div>
        </div>
        )
    }

    handleWordChange(event){
        this.setState({word: event.target.value})
    }

    async handleSubmit(){
        wordRequester.searchWord(this.state.word)
    }
}

