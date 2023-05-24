import { Component } from "react";

import "../style/memotest.css"
import LanguageSelector from "../components/languageSelector";
import CategorySelector from "../components/categorySelector";
import DifficultySelector from "../components/difficultySelector";





class Memotest extends Component{


    constructor(props) {
        super(props);
        this.state = {language: "", category: "", difficulty: "", words:[], limit: undefined, answerCorrectly: null, correctAnswer: "", validation: ""};
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
        
    }
    async componentDidMount(){
        await this.loadWords()
    }



    render(){

        return(
            <div>
                <div  className="container w-25">
                    <div className="row">
                <LanguageSelector func={this.handleLanguageChange} margin="1%"/>
                <CategorySelector func={this.handleCategoryChange}margin="1%"/>
                <DifficultySelector func={this.handleDifficultyChange}margin="1%"/>
                    </div>
                </div>



            </div>


        );

    }
     async loadWords(){
        const words = await this.wordRequester.getWords(this.state.language, this.state.category, this.state.difficulty, this.state.limit)
        this.setState({words: words});
        // this.setState({words: words}, async () => {if(this.state.words.length !== 0) this.showWords()})
    }




    handleLanguageChange(event){
        this.setState({language: event.target.value}, async() => {await this.loadWords()});
    }

    handleCategoryChange(event){
        
        this.setState({category: event.target.value}, async() => {await this.loadWords()});
    }
    handleDifficultyChange(event){
        this.setState({difficulty: event.target.value}, async()=> {await this.loadWords()});
        
    }




}
export default Memotest;