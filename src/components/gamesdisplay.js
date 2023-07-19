
import { Component } from "react";
import ReadAndWrite from "../pages/readAndWrite";
import "../style/homepage.css"
import FillInTheGaps from "../pages/fillInTheGaps";
import Memotest from "../pages/memotest";




class GamesDisplay extends Component{

    constructor(props){
        super(props);
        this.t = this.props.t;

        this.handleRaWClick = this.handleRaWClick.bind(this);
        this.handleFillInTheGapsClick = this.handleFillInTheGapsClick.bind(this);
        this.handleMemotestClick = this.handleMemotestClick.bind(this);

        this.disableShown = this.disableShown.bind(this);
    }

    render(){


        return(
            
            <div className="d-flex" style={{height:"100%", width:"100%"}}>
                
                <div class="d-flex flex-column flex-shrink-0 p-3 text-white gd-div" style={{width:"auto",height:"100%"}}>

    
    <ul class="nav nav-pills flex-column mb-auto justify-content-between" >
        
        
    <li class="nav-item mb-5 press fs-5" >
    <li class="nav-link text-white" style={{justifyContent:"center", textAlign:"center"}} onClick={this.handleRaWClick} >
    <i class="bi bi-translate" style={{paddingRight:"10px"}}></i>
    {this.t("global:header:Translate-it")}
    </li>
    </li>
    <li class="nav-item mb-5 press fs-5">
    <li class="nav-link text-white"  style={{justifyContent:"center", textAlign:"center"}} onClick={this.handleFillInTheGapsClick}>
    <i class="bi bi-pencil-square" style={{paddingRight:"10px"}}></i>
    
    {this.t("global:header:Fill-in-the-gaps")}

    </li>
    </li>
    <li className="nav-item mb-5 press fs-5">
    <li class="nav-link text-white" style={{justifyContent:"center", textAlign:"center"}} onClick={this.handleMemotestClick}>
    <i class="bi bi-file" style={{paddingRight:"10px"}} ></i>
    Memotest

    </li>
    </li>
    
    </ul>
    </div>
        <div className="title-choose w-100" style={{justifyContent:"center", marginTop:"100px", display:"flex"}}><h1 className="d-flex" style={{color:"white"}}><h1 className="arrow" style={{marginRight:"20px"}}>⬅</h1>{this.t('global:header:Start-Playing-Choose-a-game-now')}</h1></div>
        <div className="RAW-div" style = {{display:"none", width:"100%", height:"auto"}}>
            <ReadAndWrite t = {this.t}/>

        </div>
        <div className="FIG-div" style = {{display:"none", width:"100%"}}>
            <FillInTheGaps t = {this.t}/>
        </div>

        <div className="MEMO-div" style={{display:"none", width:"100%"}}>
            <Memotest t = {this.t}/>
        </div>


        </div>

        /* <div className="m-2">
            <div>
            <h1 className="fs-2">¡Learn about our games!</h1>
            </div>
            <div>
                
                <h2 className="fs-4">Read And Write</h2>
            <p>In this awesome game you will be given a word based on the category and language you picked and you will have to check if the translation is okay</p>
            </div>
            <p></p>
            <p></p>
            
        </div> */
            
            
   

        )
    }

    handleRaWClick(event){
        this.disableShown();
        event.target.className+=" active";
        document.querySelector(".RAW-div").style.display = "block";
    }


    handleFillInTheGapsClick(event){
        this.disableShown();
        event.target.className+=" active";
        document.querySelector(".FIG-div").style.display = "block";
    }

    handleMemotestClick(event){
        console.log("hola")
        this.disableShown();
        event.target.className+=" active";
        document.querySelector(".MEMO-div").style.display = "block";


    }
    
    disableShown(){
        try{
        var element = document.querySelector(".active");
        document.querySelector(".RAW-div").style.display = "none";
        document.querySelector(".FIG-div").style.display = "none";
        document.querySelector(".MEMO-div").style.display = "none";
        document.querySelector(".title-choose").style.display = "none";
        
        
        // const elements = Array.from(document.querySelectorAll('li')).filter(element => element.classList.contains('active'));
        
        element.classList.remove("active");
        }catch(e){
            return 
        }


    }
}

export default GamesDisplay;