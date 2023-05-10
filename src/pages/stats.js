import { Component } from "react";
import LanguageSelector from "../components/languageSelector";
import CategorySelector from "../components/categorySelector";
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

        this.state = {percentage:0, language: "", category: ""}

        this.handleAuth();
        
        
    }

    

  async componentDidMount() {
    const attempts = await statsRequester.getWordsAttempt(this.state.language, this.state.category);
    
    var act_percentage = 0;
    for (const word of attempts){
        if (word.correct){
            act_percentage +=1;
        }
    }    
  

  }


    render(){
        return(
            <div>
            <NavBar selected="stats"/>
            <div class="container w-100 mt-5 text-center">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="w-75 position-relative top-50 start-0 translate-middle-y" >
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
                    <div class="col-sm div-five-words" >
                    <h2 className="five-words-h2">Five words that you struggle the most with</h2>
                    
                    </div>
                </div>
                </div>
                

            </div>

        );
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




    }






}


export default Stats;