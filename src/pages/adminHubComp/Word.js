import React from "react";
import { WordRequester } from "../../util/requester/wordRequester";
import CategorySelector from "../../components/categorySelector";
import { alert } from "../../util/alert";
import LanguageSelector from "../../components/languageSelector";
import Swal from "sweetalert2";

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
        this.handleDelete = this.handleDelete.bind(this)
    }

    render(){
        return (
        <div className="container col-3">
            <div className="card">
                <h4 className="card-header">Add/Delete Word</h4>
                <div className="p-2">
                    <label className="form-label">Enter word in english</label>
                    <input className="form-control shadow-none" onChange={this.handleWordChange}/>

                    <br/>

                    <CategorySelector func={this.handleCategoryChange}/>

                    <br/>
                    
                    <button className="btn btn-success m-1 fs-5 w-25" onClick={this.handleSubmit}><i class="bi bi-plus-square"></i></button>
                    <button className="btn btn-danger fs-5 w-25" onClick={this.handleDelete}><i class="bi bi-trash"></i></button>
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
        if(this.state.addWordCategory.length === 0){
            alert('warning', "Please select catedory")
            return
        }
        const status = await wordRequester.createWord(this.state.addWordInput, this.state.addWordCategory)
        if(status === 200){
            alert('success', 'Word added successfully', '')
        }
        else{
            alert('error', 'An error occurred', 'An error occurred when adding word')
        }
    }

    async handleDelete(){
        const status = await wordRequester.deleteWord(this.state.addWordInput)
        if(status === 200){
            alert('success', 'Word deleted successfully', '')
        }
        else{
            alert('error', 'An error occurred', 'The word was not deleted correctly')
        }
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

                    <LanguageSelector func={this.handleLangChange}/>

                    <br/>

                    <button className="btn btn-success fs-5 w-25" onClick={this.handleSubmit}><i class="bi bi-plus-square"></i></button>
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
        if(this.state.dif.length === 0){
            alert('warning', "Select difficulty")
            return
        }
        if(this.state.lang.length === 0){
            alert('warning', "Select language")
            return
        }
        const status = await wordRequester.addTranslation(this.state.word, this.state.translation, this.state.dif, this.state.lang)
        if(status === 200){
            alert('success', 'Translation added successfully', '')
        }
        else{
            alert('error', 'An error occurred', 'An error occurred when adding translation')
        }
    }
}


//Component for searching word info
class SearchWord extends React.Component{

    constructor(props){
        super(props)

        this.state = {word: "", status: "",  category: "", translations: [], result: ""}

        this.handleWordChange = this.handleWordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleWordUpdate = this.handleWordUpdate.bind(this)
    }

    render(){
        return (
            <div className="container col-3">
            <div className="card">
                <h4 className="card-header">Search Word</h4>
                <div className="p-2">
                    <label className="form-label">Enter word in english</label>
                    <form onSubmit={this.handleSubmit}>
                    <input className="form-control shadow-none" onChange={this.handleWordChange}/>
                    </form>

                    <br/>

                    <button className="btn btn-primary m-1 fs-5 w-25" onClick={this.handleSubmit}><i class="bi bi-search"></i></button>
                    <button className="btn btn-secondary fs-5 w-25" onClick={this.handleWordUpdate}><i class="bi bi-pencil"></i></button>
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
    async handleSubmit(event){
        event.preventDefault();
        const response = await wordRequester.searchWord(this.state.word)
        console.log(response)
        if(response.status !== 200){
            alert("error", "Word not found", "")
        }
        this.setState({result: response.data})
    }

    async handleWordUpdate(){
        Swal.fire({
            title:"Insert new word",
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then(async result => { 
            if(result.value){
                const response = await wordRequester.updateWord(this.state.word, result.value)
                if(response === 200){
                    alert("success", "Word updated succesfully")
                    return
                }
            }
            alert("error", "Could not update word")
            return
        })
    }
}


//Component for displaying word info
class SearchResult extends React.Component{
    constructor(props){
        super(props)

        this.languages = []
        this.translationsByLang = []
        this.state = {translation: 0}

        this.handleTranslationChange = this.handleTranslationChange.bind(this)
        this.handleTranslationDelete = this.handleTranslationDelete.bind(this)
    }
    
    render(){
        if(!this.props.wordInfo) return("")

        this.loadInfo()

        return(
            <div>
                <ul>
                    {this.translationsByLang}
                </ul>
                <br/>
                <h5>Delete translation by id:</h5>
                <br/>
                <label className="form-label">Enter translation id:</label>
                <input className="form-control shadow-none" onChange={this.handleTranslationChange}></input>
                <br/>
                <button type="button" className="btn btn-danger fs-5 w-25"onClick={this.handleTranslationDelete} ><i class="bi bi-trash"></i></button>
            </div>
        )
    }

    // Creates a react component for each language with its translations
    loadInfo(){
        this.languages = []
        this.translationsByLang = []

        for (let i = 0; i < this.props.wordInfo.length; i++) {
            const listElement = this.props.wordInfo[i]

            const translations = listElement.translations.map((translation) => {return [translation.translated, " id: " + translation.id]})

            this.languages.push(listElement.name)

            const reactListItem = <li key={listElement.name}>{listElement.name}: {translations.map((translation) => translation + " ")}</li>

            this.translationsByLang.push(reactListItem);
            
        }
    }

    handleTranslationChange(event){
        this.setState({translation: event.target.value})
    }

    async handleTranslationDelete(){
        const response = await wordRequester.deleteTranslation(this.state.translation)
        if(response === 200){
            alert('success', 'Translation deleted successfully', '')
        }
        else{
            alert('error', 'Translation not found', '')
        }
    }
}

