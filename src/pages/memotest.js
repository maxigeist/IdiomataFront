import { Component } from "react";

import "../style/memotest.css"
import LanguageSelector from "../components/languageSelector";
import CategorySelector from "../components/categorySelector";
import DifficultySelector from "../components/difficultySelector";
import WordRequester from "../util/requester/wordRequester";





class Memotest extends Component{

    wordRequester = new WordRequester();


    constructor(props) {
        super(props);
        this.state = {language: "", category: "", difficulty: "", words:[], translations:[],limit: undefined, answerCorrectly: null, first_card:"", second_card:""};
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
        this.flipButton = this.flipButton.bind(this)
        this.createCards = this.createCards.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        
    }
    async componentDidMount(){
        await this.loadWords()
    }



    render(){

        return(
            <div>
                <div  className="container w-50 mt-4">
                    <div className="row">
                        <div className="col">
                            <LanguageSelector func={this.handleLanguageChange} margin="1%"/>
                        </div>
                        <div className="col">
                             <CategorySelector func={this.handleCategoryChange}margin="1%"/>
                        </div>
                        <div className="col">
                            <DifficultySelector func={this.handleDifficultyChange}margin="1%"/>
                        </div> 
                    </div>
                </div>
                <div className="cards">
                    
                    {/* <button className = "" onClick={this.flipButton} style={{height:"100px", width:"100px"}}>
                        <p className="inside-text" style={{pointerEvents:"none"}}></p>
                    </button> */}

                    <this.createCards/>



                </div>



            </div>


        );

    }
     async loadWords(){
        const words = await this.wordRequester.getWords(this.state.language, this.state.category, this.state.difficulty, this.state.limit)
        console.log(words)
        const translations_aux = []
        for(var i=0; i<10; i++){
            translations_aux.push(words[i].translations[0])
        }
        this.setState({words: words.slice(0,10), translations: translations_aux}, async () => {if(this.state.words.length !== 0 && this.state.words === 10) this.createCards()})
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
    flipButton(event) {
            try{
            event.target.classList.add("rotate");
            event.target.classList.remove("rotate-back");
            var x = event.target.children[0];
            console.log(x)
            setTimeout(function(){x.classList.add("text")
            x.innerHTML = (`${event.target.value}`)},500)
            if(this.state.first_card === ""){
                this.state.first_card = event;
            }
            else{
                this.setState({second_card : event})
                if(this.state.first_card.id === "word"){
                    // if(this.state.first_card.inEnglish)
                    
                    
                }
                else{

            }
            
            }
        }
            catch(e){
                return;
            }
        }
    
    

     createCards(){
        if(this.state.words.length !== 0){

            const random_indexes = [];
            for (let i = 0; i < this.state.words.length; i+=1) {
                var x = Math.floor(Math.random() * 10)
                if(random_indexes.includes(x)){
                    i-=1;

                }
                else{
                    random_indexes.push(x)
                }
            }
            console.log(random_indexes)
            const random_translations_index = this.shuffleArray(random_indexes);
            
            

            const elements = [];
            for (let i = 0; i < random_indexes.length; i+=1) {
                

                    elements.push(
                        
                        <div className=""style={{display:"inline"}}>
                            
                        <button id={random_indexes[i]}className="memo-card" onClick={this.flipButton} style={{height:"180px", width:"150px"}} value={this.state.words[random_indexes[i]].inEnglish}>
                            <label className="p-text" id={i} style={{pointerEvents:"none"}} ></label>
                        </button>
                        <button className = "memo-card"  onClick={this.flipButton} style={{height:"180px", width:"150px"}} value={this.state.translations[random_translations_index[i]].translated}>
                        <label className="p-text"  style={{pointerEvents:"none"}} ></label>
                        </button>
                        </div>

                        
                    );

                
            }

            return <div style={{display:"inline"}}>{elements}</div>;

        }
    }

    shuffleArray(array) {
        const new_array = array.slice();
        for (let i = new_array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [new_array[i], new_array[j]] = [new_array[j], new_array[i]];
        }
        return new_array;
      }
    
    flip_card(event){
        event.target.classList.remove("rotate");
        event.target.classList.add("rotate-back");
        var x = event.target.children[0];
        setTimeout(function(){x.classList.remove("text")
        x.innerHTML = ("") },0)

    }

}




export default Memotest;