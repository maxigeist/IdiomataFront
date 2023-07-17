import React, { Component } from "react";

import "../style/memotest.css"
import CategorySelector from "../components/categorySelector";
import DifficultySelector from "../components/difficultySelector";
import WordRequester from "../util/requester/wordRequester";
import UserRequester from "../util/requester/userRequester";
import {StatsRequester} from "../util/requester/statsRequester";
import Swal from "sweetalert2";
import { alert } from "../util/alert";





class Memotest extends Component{

    wordRequester = new WordRequester();
    userRequester = new UserRequester();
    statsRequester = new StatsRequester();

    first_card = ""
    second_card = ""
    flipped_elements = []
    cards = null;
    chronometerRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {language: "", category: "", difficulty: "", words:[], translations:[],limit: undefined, answerCorrectly: null, elements:"", flipped_elements_qty:0, tries:0, bestTime: ""};
        this.t = this.props.t;
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
        this.flipButton = this.flipButton.bind(this)
        this.createCards = this.createCards.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.flip_card = this.flip_card.bind(this);
        this.unflip = this.unflip.bind(this)
        
    }

    async componentDidMount(){
        console.log("componentDidMount")
        this.setState({answerCorrectly:null, elements:"" , flipped_elements_qty: 0, tries: 0})
        await this.loadWords();
        this.flipped_elements = [];
        await this.getBestTime();
        this.chronometerRef.current.resetChronometer();
    }


    render(){
        return(
            <div className="container w-100 h-100">
                <div className="row h-25">
                <div  className="container pt-4">
                    <div className="row">
                        <div className="col-2">
                                <button className="btn btn-warning" onClick={() => {this.componentDidMount()}}>Restart Game</button>
                        </div>
                        <div className="row col-7">
                            <div className="col">
                                <h4>✅: {this.state.flipped_elements_qty/2}</h4>
                            </div>
                            <div className="col">
                                <h4>❌: {this.state.tries - (this.state.flipped_elements_qty/2)}</h4>
                            </div>
                            <div className="col">
                                <Chronometer ref={this.chronometerRef}/>
                            </div>
                            <div className="col">
                                <h4>Best: {this.state.bestTime}</h4>
                            </div>
                        </div>
                        <div className="col">
                             <CategorySelector func={this.handleCategoryChange}margin="1%" t={this.t}/>
                        </div>
                        <div className="col">
                            <DifficultySelector func={this.handleDifficultyChange}margin="1%" t={this.t}/>
                        </div> 
                    </div>
                </div>
                <div className="d-flex justify-content-center w-100">
                <h1 className="ftp">{this.t("global:header:Find-the-pairs")}</h1>
                </div>
                </div>
                
                <div className="row h-75">
                <div className="cards container">
                    {this.cards}
                </div>
                </div>
            </div>


        );

    }
    
    async loadWords(){
        try{
            this.unflip();
        }
        catch(e){
            console.log(e)
        }
        
        const language = await this.userRequester.getUserLanguage();

        this.setState({language: language.language})

        let words = await this.wordRequester.getWords(language.language, this.state.category, this.state.difficulty, this.state.limit)
        
        console.log(words)

        if(words.length < 10){
            alert("warning", "Not enough words", "There are not enough words to play, please select another category and difficulty combination")
            words = await this.wordRequester.getWords(language.language, "", "", undefined)
        }

        words = this.shuffleArray(words)

        const translations_aux = []
        for(var i=0; i<10; i++){
            translations_aux.push(words[i].translations[0])
        }
        this.setState({words: words.slice(0,10), translations: translations_aux})
        this.cards = this.createCards(words.slice(0,10), translations_aux)
    }

    handleCategoryChange(event){
        
        this.setState({category: event.target.value}, async() => {await this.componentDidMount()});
    }
    handleDifficultyChange(event){
        this.setState({difficulty: event.target.value}, async()=> {await this.componentDidMount()});
        
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

            console.log(this.state.words)
            
            if(this.first_card === ""){
                this.first_card = event.target;
            }
            else{
                this.second_card = event.target;
                var status = false;

                //Checks if first card has id and then checks if the words match
                if(this.first_card.id !== ""){  
                    
                    if (this.state.translations[this.first_card.id].translated !== this.second_card.value){
                        console.log(this.state.translations[this.first_card.id].translated)
                        console.log(this.second_card.value)
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
                        console.log(this.state.translations[this.second_card.id].translated)
                        console.log(this.first_card.value)
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
                    this.flipped_elements.push(this.first_card)
                    this.flipped_elements.push(this.second_card)
                    
                    this.setState({flipped_elements_qty: this.flipped_elements.length})

                    if(this.flipped_elements.length === 20){
                        const time = this.chronometerRef.current.state.seconds
                        await this.statsRequester.saveMemotestTime(time);
                        Swal.fire({
                            title: '🎉Congratulations! You won!🎉',
                            html: `
                            <div className="row">
                                <div className="col">
                                    <h4>✅: ${this.state.flipped_elements_qty/2}</h4>
                                </div>
                                <div className="col">
                                    <h4>❌: ${this.state.tries - (this.state.flipped_elements_qty/2)}</h4>
                                </div>
                                <div className="col">
                                    <h4>⌛: ${this.format(time)}</h4>
                                </div>
                            </div>`,
                            confirmButtonText: 'Play again!',
                        }).then(async ()=>{ await this.componentDidMount()})
                        }

                }

                this.setState({tries: this.state.tries + 1})

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
    
    

     createCards(words, translations){

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
                            
                        <button id={random_indexes[i]} className="memo-card w-75" onClick={this.flipButton}  value={words[random_indexes[i]].inEnglish}>
                            <label className="p-text" id={i} style={{pointerEvents:"none"}}></label>
                        </button>
                        
                        <button className = "memo-card w-75"  onClick={this.flipButton}  value={translations[random_translations_index[i]].translated}>
                        <label className="p-text"  style={{pointerEvents:"none"}} ></label>
                        </button>
                        </div>

                        
                    );

            
            
                    }


            
            
            return <div className="d-flex text-center w-100 h-100" id="god"><div class="row h-75 w-100" >{elements}</div></div>;
            
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

    unflip(){
        
        for(var i=0;i<this.flipped_elements.length;i++){
            this.flipped_elements[i].classList.remove("flipped", "green", "rotate")
            this.flipped_elements[i].classList.add("rotate-back")
            this.flipped_elements[i].children[0].innerHTML = "";
        }
    }

    async getBestTime(){
        try{
            const bestTime = await this.statsRequester.getBestTime();
            this.setState({bestTime: bestTime? this.format(bestTime.bestTime) : "--:--"})
        }
        catch(e){
            console.log(e)
        }
    }

    format(seconds){
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    handleResetChronometer = () => {
        if (this.chronometerRef.current) {
          this.chronometerRef.current.resetChronometer();
        }
      };


}

class Chronometer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1,
      }));
    }, 1000);
  }

  resetChronometer = () => {
    this.setState({
      seconds: 0,
    });
  };

  render() {
    const { seconds } = this.state;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <h4>⌛: {minutes < 10 ? '0' : ''}{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</h4>
    );
  }
}


export default Memotest;