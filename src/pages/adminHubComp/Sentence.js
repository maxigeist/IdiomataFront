import React from "react"
import LanguageSelector from "../../components/languageSelector"
import { SentenceRequester } from "../../util/requester/sentenceRequester"
import { alert } from "../../util/alert";
import  Modal  from "react-bootstrap/Modal";
import DifficultySelector from "../../components/difficultySelector";

const sentenceRequester = new SentenceRequester();

export class Sentence extends React.Component{



    render(){
        return(
            <div className="row">
                <CreateSentence t={this.props.t}/>
                <SearchSentence t={this.props.t}/>
            </div>
        )}
}

class CreateSentence extends React.Component{

    constructor(props){
        super(props)
        this.t = this.props.t

        this.state = {languageSelected: "", difficultySelected: "",currentPart: "", parts: [], currentAnswer: "", answers: []}

        this.handleCurrentPartChange = this.handleCurrentPartChange.bind(this)
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handlePartSubmit = this.handlePartSubmit.bind(this)
        this.handlePartRemove = this.handlePartRemove.bind(this)
        this.handleCurrentAnswerChange = this.handleCurrentAnswerChange.bind(this)
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this)
        this.handleAnswerRemove = this.handleAnswerRemove.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
    }

    render(){
        return(
            <div className="container col-3">
                <div className="card" style={{ height: '575px', overflowY: 'auto' }}>
                    <h4 className="card-header">{this.t("global:header:Create-sentence")}</h4>
                    <div className="p-2">

                        <div>
                            <b>{this.t("global:header:Sentence")}: </b>
                            {this.state.parts.map((part, index) => {
                            if(index !== this.state.parts.length - 1) return part + "___"
                            else {return part}
                            })}
                        </div>

                        <label className="form-label">{this.t("global:header:Enter-new-part")}</label>
                        <input className="form-control shadow-none" onChange={this.handleCurrentPartChange}/>
                        <button className="btn btn-outline-primary me-2" onClick={this.handlePartSubmit}>{this.t("global:header:Add")}</button>
                        <button className="btn btn-outline-danger" onClick={this.handlePartRemove}>{this.t("global:header:Remove")}</button>
                        <br/>
                        <br/>

                        <div>
                            <b>{this.t("global:header:Answers")}: </b>
                            {this.state.answers.map((answer, index) => {
                            if(index !== this.state.answers.length - 1) return " " + answer + ','
                            else {return " " + answer}
                            })}
                        </div>

                        <label className="form-label">{this.t("global:header:Enter-answer-in-english")}:</label>
                        <input className="form-control shadow-none" onChange={this.handleCurrentAnswerChange}/>
                        <button className="btn btn-outline-primary me-2" onClick={this.handleAnswerSubmit}>{this.t("global:header:Add")}</button>
                        <button className="btn btn-outline-danger" onClick={this.handleAnswerRemove}>{this.t("global:header:Remove")}</button>
                        <br/>
                        <br/>

                        <LanguageSelector func={this.handleLanguageChange} t={this.t}/>
                        <DifficultySelector func={this.handleDifficultyChange} t={this.t}/>

                        <br/>
                        
                        <button className="btn btn-success m-1 fs-5 w-25" onClick={this.handleSubmit}><i class="bi bi-plus-square"></i></button>
                    </div>
                </div>
            </div>
        )
    }

    handleDifficultyChange(event){
        this.setState({difficultySelected: event.target.value})
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
        if(this.state.parts.length === 0 || this.state.answers.length === 0 ){
            alert('warning', this.t("global:header:Sentence-or-answers-missing"), this.t("global:header:Make-sure-to-add-both-the-sentence-parts-and-the-answer"))
            return
        }
        const res = await sentenceRequester.createSentence(this.state.languageSelected, this.state.parts, this.state.answers, this.state.difficultySelected)
        if(res === 200){
            alert('success', this.t('global:header:Sentence-added-successfully'))
        }else if(res === 404){
            alert('error', this.t('global:header:Word-or-words-not-found'), this.t("global:header:Check-if-the-words-you-are-using-exist"))
        }else if(res === 400){
            alert('error', this.t('global:header:Something-is-missing'), this.t('global:header:Make-sure-to-select-language-and-difficulty'))
        }else{
            alert('error', this.t('global:header:Something-went-wrong'))
        }
    }
}

class SearchSentence extends React.Component{
    constructor(props){
        super(props)
        this.t = this.props.t;

        this.state = {languageSelected: "", sentences:[]}

        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    render(){
        return (
            <div className="container col-3">
                <div className="card" style={{height: "575px", overflowY: "auto"}}>
                    <h4 className="card-header">{this.t("global:header:Search-sentence")}</h4>
                    
                    <div className="p-2">
                        <LanguageSelector func={this.handleLanguageChange} t={this.t}/>

                        <SearchResult searchFunction={this.handleSearch} sentences={this.state.sentences} languageSelected={this.state.languageSelected} t={this.t}/>
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
        const response = await sentenceRequester.searchSentence(language?language: this.state.languageSelected, "")

        this.setState({sentences: response})
    }
}

export class SearchResult extends React.Component{
    constructor(props){
        super(props)

        this.state = {activeId: "", showModal: false}
        this.t = this.props.t;


        this.parseSentences = this.parseSentences.bind(this)
        this.makeActive = this.makeActive.bind(this)
        this.inactiveElements = this.inactiveElements.bind(this)
        
        this.handleDeleteButton = this.handleDeleteButton.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        
    }

    render(){
        if(!this.props.sentences) return ""
        if(this.props.sentences.length === 0) return ""

        return(
            <div>
                <ul className="list-group m-2">
                {this.parseSentences()}
                </ul>

                <br/>
                
                <button class= "btn btn-secondary fs-5 bts" onClick={this.handleModalOpen}><i class="bi bi-pencil"></i></button>
                <button class="btn btn-danger fs-5 bts" onClick={this.handleDeleteButton}><i class="bi bi-trash"></i></button>


                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{this.t('global:header:Update-Sentence')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateSentence t ={this.t} inactiveElements={this.inactiveElements} searchFunction={this.props.searchFunction} sentences={this.props.sentences} languageSelected={this.props.languageSelected} activeId={this.state.activeId} hideModal={this.handleModalClose}/>
                    </Modal.Body>
                </Modal>
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
                blanks.push(blank[0])
            })
            result.push({parts: parts.join("__"), answers: blanks.join(','), id: sentence.id})
        });

        return this.makeListOptions(result)
    }

    makeListOptions(result){
        if(this.props.sentences.length === 0) return ""

        const options = result.map((sentence, index) => (<li className="list-group-item " id={sentence.id} onClick={this.makeActive} key={index} style={{userSelect:"none"}}>{this.t("global:header:Sentence")}: {sentence.parts} <br></br>{this.t("global:header:Answers")}: {sentence.answers}</li>))
        return options
    }

    async makeActive(event){
        if (event.target.classList.contains("active")){
            event.target.classList.remove("active");
            await this.setState({activeId: ""});
            
        }
        else{
            this.inactiveElements();
            event.target.classList.add("active");
            await this.setState({activeId: event.target.id});
            
        }
    }

    inactiveElements(){
        document.querySelectorAll(".list-group-item").forEach((element) => {
            element.classList.remove("active")
            }
        )
        this.setState({active: ""});
    }

    async handleDeleteButton(){
        if(this.state.activeId.length !== 0){
            const status = await sentenceRequester.deleteSentence(Number(this.state.activeId))

            if (status === 200){
                alert('success',this.t('global:header:Sentence-deleted-successfully'))
                this.setState({activeId: ""})
                this.props.searchFunction()
                this.inactiveElements()
            }

            else{
                alert('error', this.t("global:header:An-error-occurred"))
            }
        }else{
            alert('warning', this.t('global:header:Select-a-sentence-to-delete'))
        }
    }

    handleModalClose(){
        this.setState({showModal: false})
      };
    
    handleModalOpen(){
        this.setState({showModal: true})
    };
}


class UpdateSentence extends React.Component{

    constructor(props){
        super(props)
        this.t = this.props.t;

        const activeSentence = this.getActiveSentence()
        
        this.state = {languageSelected: this.props.languageSelected, currentPart: "", parts: activeSentence.parts.map((part) => part.content), currentAnswer: "", answers: activeSentence.blanks.map((blank) => blank[0]), activeSentence: activeSentence}

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
            <div className="card">
                <div className="p-2">
                    <div>
                        <b>{this.t("global:header:Sentence")}: </b>
                        {this.state.parts.map((part, index) => {
                        if(index !== this.state.parts.length - 1) return part + "___"
                        else {return part}
                        })}
                    </div>

                    <label className="form-label">{this.t("global:header:Enter-new-part")}</label>
                    <input className="form-control shadow-none" onChange={this.handleCurrentPartChange}/>
                    <button className="btn btn-outline-primary me-2" onClick={this.handlePartSubmit}>{this.t("global:header:Add")}</button>
                    <button className="btn btn-outline-danger" onClick={this.handlePartRemove}>{this.t("global:header:Remove")}</button>
                    <br/>
                    <br/>

                    <div>
                        <b>{this.t("global:header:Answers")}: </b>
                        {this.state.answers.map((answer, index) => {
                        if(index !== this.state.answers.length - 1) return " " + answer + ','
                        else {return " " + answer}
                        })}
                    </div>

                    <label className="form-label">{this.t("global:header:Enter-answer-in-english")}:</label>
                    <input className="form-control shadow-none" onChange={this.handleCurrentAnswerChange}/>
                    <button className="btn btn-outline-primary me-2" onClick={this.handleAnswerSubmit}>{this.t("global:header:Add")}</button>
                    <button className="btn btn-outline-danger" onClick={this.handleAnswerRemove}>{this.t("global:header:Remove")}</button>
                    <br/>
                    <br/>

                    
                    <button className="btn btn-secondary m-1 fs-5 w-25" onClick={this.handleSubmit}><i class="bi bi-pencil"></i></button>
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
        if(this.state.parts.length === 0 || this.state.answers.length === 0 ){
            alert('warning', this.t("global:header:Sentence-or-answers-missing"), this.t("global:header:Make-sure-to-add-both-the-sentence-parts-and-the-answer"))
            return
        }
        const res = await sentenceRequester.updateSentence(this.state.activeSentence.id, this.props.languageSelected,this.state.parts, this.state.answers)
        this.props.hideModal()
        if(res === 200){
            alert('success',this.t("global:header:Sentence-added-successfully"))
            this.props.searchFunction()
            this.props.inactiveElements()
        }else if(res === 404){
            alert('error', this.t('global:header:Word-or-words-not-found'), this.t('global:header:Check-if-the-words-you-are-using-exist'))
        }else{
            alert('error',this.t('global:header:Something-went-wrong'))
        }
    }

    getActiveSentence(){
        for(let i = 0; i < this.props.sentences.length; i++){
            if(this.props.sentences[i].id === Number(this.props.activeId)) return this.props.sentences[i]
        }
        this.props.hideModal();
        alert('warning',this.t('global:header:No-sentence-selected'))
    }
}