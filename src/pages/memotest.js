import { Component } from "react";

import "../style/memotest.css"
import LanguageSelector from "../components/languageSelector";
import CategorySelector from "../components/categorySelector";
import DifficultySelector from "../components/difficultySelector";
import WordRequester from "../util/requester/wordRequester";





class Memotest extends Component{

    wordRequester = new WordRequester();
    first_card = ""
    second_card = ""

    constructor(props) {
        super(props);
        this.state = {language: "", category: "", difficulty: "", words:[], translations:[],limit: undefined, answerCorrectly: null, elements:""};
        this.handleLanguageChange = this.handleLanguageChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
        this.flipButton = this.flipButton.bind(this)
        this.createCards = this.createCards.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.flip_card = this.flip_card.bind(this);
        
    }
    componentDidMount(){
        this.createCards();
    }



    render(){

        return(
            <div className="container w-100 h-100">
                <div className="row h-25">
                <div  className="container w-50 pt-4">
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
                <div className="d-flex justify-content-center w-100">
                <h1 className="ftp">Find the pairs!</h1>
                </div>
                </div>
                
                <div className="row h-75">
                <div className="cards container">
                    
                    
                    
                    <this.createCards/>
                    
                    



                </div>
                </div>



            </div>


        );

    }
     async loadWords(){
        
        const words = await this.wordRequester.getWords(this.state.language, this.state.category, this.state.difficulty, this.state.limit)
        
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
    async flipButton(event) {
            try{
                //In case the card was not flipped, the code inside the if flips it. 
                if(!event.target.classList.contains("flipped")){
            
            
            
            event.target.classList.add("rotate");
            event.target.classList.remove("rotate-back")
            var x = event.target.children[0];
            
            
            x.classList.add("text")
            x.innerHTML = (`${event.target.value}`)
            
            if(this.first_card === ""){
                this.first_card = event.target;
            }
            else{
                this.second_card = event.target;
                var status = false;

                //Checks if first card has id and then checks if the words match
                if(this.first_card.id !== ""){  
                    if (this.state.translations[this.first_card.id].translated !== this.second_card.value){
                        this.flip_card(this.first_card, this.second_card); 
                    }
                    //In case it matches
                    else{status = true}
                }   
                //Checks if both of them are in the foreign language
                else if(this.first_card.id === "" && this.second_card.id === ""){
                    this.flip_card(this.first_card, this.second_card);
                }
                //Checks if second_card has id and then checks if the words match
                else if (this.second_card.id !== ""){
                    if(this.state.translations[this.second_card.id].translated !== this.first_card.value){
                        this.flip_card(this.first_card, this.second_card);
                    }
                    //In case it matches
                    else{status = true}
                }
                //If it matches, the card gets added the flipped classname for stopping it to be flipped again
                if(status){
                this.first_card.classList.add("flipped")
                this.second_card.classList.add("flipped")
                this.first_card.classList.add("green")
                this.second_card.classList.add("green")
                
                }

                //values from first and second card restarted.
                this.first_card = ""
                this.second_card = ""
            }
        }
        }
            catch(e){
                console.log(e);
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
            
            const random_translations_index = this.shuffleArray(random_indexes);
            
            
            

            const elements = [];
            
            for (let i = 0; i < random_indexes.length; i+=1) {
                

                    elements.push(
                        
                        <div className="col-3 w-auto justify-content-center">
                            
                        <button id={random_indexes[i]} className="memo-card w-75" onClick={this.flipButton}  value={this.state.words[random_indexes[i]].inEnglish}>
                            <label className="p-text" id={i} style={{pointerEvents:"none"}}></label>
                        </button>
                        
                        <button className = "memo-card w-75"  onClick={this.flipButton}  value={this.state.translations[random_translations_index[i]].translated}>
                        <label className="p-text"  style={{pointerEvents:"none"}} ></label>
                        </button>
                        </div>

                        
                    );

            
            
                    }


            console.log(elements)
            
            return <div className="d-flex text-center w-100 h-100"><div class="row h-75 w-100" >{elements}</div></div>;
            
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
    

      //This functions flips both cards in the case they didn't match,
    flip_card(event1, event2){
        
        setTimeout(function(){
         
        event1.classList.remove("rotate");
        event1.classList.add("rotate-back");
        var x = event1.children[0];
        x.classList.remove("text");
        x.innerHTML = ("");
        event2.classList.remove("rotate");
        event2.classList.add("rotate-back");
        var y = event2.children[0];
        y.innerHTML = ("");
        y.classList.remove("text");
        },1000
            
        )

    }


}




export default Memotest;