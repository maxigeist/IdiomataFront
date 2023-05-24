import { Component } from "react";
import LanguageSelector from "../components/languageSelector";
import CategorySelector from "../components/categorySelector";
import GameSelector from "../components/gameSelector";
import { pageAuth } from "../util/pageAuth";
import Swal from "sweetalert2";
import "../style/stats.css"
import NavBar from "../components/navbar";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from "./ChangingProgressProvider";
import { StatsRequester } from "../util/requester/statsRequester";



const statsRequester = new StatsRequester();



class Stats extends Component{

    constructor(props){
        super(props)

        this.state = {percentage:0, attempts:0,language: "", category: "", game: "", list_with_five_words : []}

        this.handleAuth();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleGameChange = this.handleGameChange.bind(this);

        this.makeFiveWords = this.makeFiveWords.bind(this);
        
        
    }

    

  async componentDidMount() {
    const attempts = await statsRequester.getWordsAttempt(this.state.language, this.state.category, this.state.game);
    this.setState({attempts: attempts.length});
    const list_attemps_errors = await statsRequester.getlistWithWordAttempts(this.state.language, this.state.category, this.state.game);
    var act_percentage = 0;
    if (attempts.length !== 0){
        for (const word of attempts){
            if (word.correct){
                act_percentage +=1;
            }
        }
        this.setState({percentage:parseInt((act_percentage/attempts.length)*100)});  
    }
    
    else{
        this.setState({percentage:0});
    }
    

    this.setState({list_with_five_words: list_attemps_errors.slice(0,5)});



    
    
    
    console.log(this.state.percentage)
  

  }


    render(){
        return(
            <div>
            <NavBar selected="stats"/>
            <div class="container w-100 mt-5 text-center">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="w-75 position-relative top-50 start-0 translate-middle-y" >
                            <GameSelector func={this.handleGameChange} margin="3%"/>
                            <LanguageSelector func={this.handleLanguageChange} margin="3%"/>
                            <CategorySelector func={this.handleCategoryChange} margin="3%"/>
                        </div>                    
                    </div>
                    <div class="col-sm m-4">

                        <div className="row">
                    
                            
                            <h1 className="accuracy-title">Accuracy Rate</h1>
                            
                            </div>
                            <div className="row">
                            <ChangingProgressProvider initialValue={0} newValue={this.state.percentage} >
                            {percentage => (
                            <CircularProgressbar value={percentage} text={`${percentage}%`} background={{}}/>
                                )}
                            </ChangingProgressProvider>
                            
                            </div>
                            
                        
                    
                        
                    
                    </div>
                    <div class="col-sm div-five-words bg-primary ms-4 p-0" >
                    <h2 className="five-words-h2 mb-4">Five words that you struggle the most with</h2>
                    <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col"><h4 className="h4-word-att">Word</h4></div><div className="col"><h4 className="h4-word-att">Mistakes</h4></div>
                    </div>
                    </div>
                    <this.makeFiveWords/>
                    <h3 className="attempts-title">Total Attempts:{this.state.attempts}</h3>
                    
                    </div>
                </div>
                </div>
                

            </div>

        );
    }

    async handleLanguageChange(event){
        await this.setState({language: event.target.value})
        await this.componentDidMount();

    }
    async handleCategoryChange(event){
        await this.setState({category: event.target.value})
        await this.componentDidMount();
    }

    async handleGameChange(event){
        
        await this.setState({game: event.target.value})
        await this.componentDidMount();
    }
    





    async handleAuth(){
        const invalid = await pageAuth();
        if(invalid)
            Swal.fire({
                icon: "warning",
                titleText: "Session expired",
                text: "You must login again",
                position:"top",
                padding: "3em 3em 3em 3em"
            }).then(() => {window.location.href = "/";})      
    }


    makeFiveWords(){
        const options = this.state.list_with_five_words.map((word, index) => (
            <div className="mt-3">
                <div className="row ">
                    <div className="col">
                        <h4 key={index} value={word} style={{color:"white"}}><i class="bi bi-arrow-right-short m-1"></i>{this.state.list_with_five_words[index].word}</h4>
                    </div>
                    <div className="col">
                        <h4 style={{color:"white"}}>{this.state.list_with_five_words[index].errors}</h4>
                    </div>
                </div>
            </div>
        ));
        return(
            
            options
        )
    }









}


export default Stats;