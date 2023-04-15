import React from "react";
import { WordRequester } from "../../util/requester/wordRequester";

const wordRequester = new WordRequester()

//This class renders 3 React components, one for each use case
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

//Component for creating new word
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

//Component for creating new translation
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


//Component for searching word info
class SearchWord extends React.Component{

    constructor(props){
        super(props)

        this.state = {word: "", status: "",  category: "", translations: [], result: ""}

        this.handleWordChange = this.handleWordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

                    <br/>
                    <br/>

                   <SearchResult wordInfo={this.state.result}/>
                    
                </div>
            </div>
        </div>
        )
    }

    handleWordChange(event){
        this.setState({word: event.target.value})
    }

    //Search the word and grab the info
    async handleSubmit(){
        const data = await wordRequester.searchWord(this.state.word)
        this.setState({result: data})
    }
}


//Component for displaying word info
class SearchResult extends React.Component{
    constructor(props){
        super(props)

        this.languages = []
        this.translationsByLang = []
    }
    
    render(){
        if(!this.props.wordInfo) return("")

        this.loadInfo()

        return(
            <ul>
                {this.translationsByLang}
            </ul>
        )
    }

    // Creates a react component for each language with its translations
    loadInfo(){
        this.languages = []
        this.translationsByLang = []

        for (let i = 0; i < this.props.wordInfo.length; i++) {
            const listElement = this.props.wordInfo[i]

            const translations = listElement.translations.map((translation) => translation.translated)

            this.languages.push(listElement.name)

            const reactListItem = <li key={listElement.name}>{listElement.name}: {translations.map((translation) => translation + " ")}</li>

            this.translationsByLang.push(reactListItem);
            
        }
    }
}

