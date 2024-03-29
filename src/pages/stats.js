import { Component } from "react";
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
import UserRequester from "../util/requester/userRequester";



const statsRequester = new StatsRequester();
const userRequester = new UserRequester();




class Stats extends Component{

    constructor(props){
        super(props)

        this.state = {percentage:0, attempts:0,language: "", category: "", game: "", list_with_five_words : []}
        this.t = this.props.t;
        this.handleAuth();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleGameChange = this.handleGameChange.bind(this);

        this.makeFiveWords = this.makeFiveWords.bind(this);
        
        
    }

    

  async componentDidMount() {
    const language = await userRequester.getUserLanguage();
    const attempts = await statsRequester.getWordsAttempt(language.language, this.state.category, this.state.game);
    this.setState({attempts: attempts.length, language: language.language});
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
            <NavBar selected="stats" t={this.props.t}/>
            <div class="container w-100 mt-5 text-center">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="w-75 position-relative top-50 start-0 translate-middle-y" >
                            <GameSelector func={this.handleGameChange} margin="3%" t={this.t}/>
                            
                            <CategorySelector func={this.handleCategoryChange} margin="3%" t={this.t}/>
                        </div>                    
                    </div>
                    <div class="col-sm m-4">

                        <div className="row">
                    
                            
                            <h1 className="accuracy-title">{this.t("global:header:Accuracy-rate")}</h1>
                            
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
                    <h2 className="five-words-h2 mb-4">{this.t("global:header:Five-words-struggle")}</h2>
                    <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col"><h4 className="h4-word-att">{this.t("global:header:Word")}</h4></div><div className="col"><h4 className="h4-word-att">{this.t("global:header:Mistakes")}</h4></div>
                    </div>
                    </div>
                    <this.makeFiveWords/>
                    <h3 className="attempts-title">{this.t("global:header:Total-attempts")}:{this.state.attempts}</h3>
                    
                    </div>
                </div>
                </div>
                

            </div>

        );
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
                titleText: this.t("global:header:Session-expired"),
                text: this.t("global:header:You-must-login-again"),
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