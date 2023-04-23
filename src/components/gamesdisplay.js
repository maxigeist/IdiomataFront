
import { Component } from "react";
import ReadAndWrite from "../pages/readAndWrite";
import "../style/homepage.css"



class GamesDisplay extends Component{

    constructor(props){
        super(props);

        this.handleRaWClick = this.handleRaWClick.bind(this);
    }

    render(){


        return(
            
            <div className="d-flex" style={{height:"100%", width:"100%"}}>
                
                <div class="d-flex flex-column flex-shrink-0 p-3 text-white gd-div" style={{width:"auto",height:"100%"}}>

    
    <ul class="nav nav-pills flex-column mb-auto justify-content-between" >
        
        
    <li class="nav-item mb-5 press fs-5" >
    <li class="nav-link text-white" style={{justifyContent:"center", textAlign:"center"}} onClick={this.handleRaWClick} >
    <i class="bi bi-pencil-square" style={{paddingRight:"10px"}}></i>
    Read and Write
    </li>
    </li>
    <li class="nav-item mb-5 press fs-5">
    <li class="nav-link text-white">
    <i class="bi bi-file" style={{paddingRight:"10px"}}></i>
    Memotest
    </li>
    </li>
    <li className="nav-item mb-5 press fs-5">
    <li class="nav-link text-white">
    <i class="fa-solid fa-headphones-simple" style={{paddingRight:"10px"}}></i>
    
    Audio
    </li>
    </li>
    
    </ul>
    </div>
        <div className="RAW-div" style = {{display:"none", width:"100%"}}>
        <ReadAndWrite/>

        </div>

        {/* <div className="m-2">
            <div>
            <h1 className="fs-2">¡Learn about our games!</h1>
            </div>
            <div>
                
                <h2 className="fs-4">Read And Write</h2>
            <p>In this awesome game you will be given a word based on the category and language you picked and you will have to check if the translation is okay</p>
            </div>
            <p></p>
            <p></p>
            
        </div> */}
            
            
    </div>

        )
    }

    handleRaWClick(event){
        event.target.className+=" active";
        document.querySelector(".RAW-div").style.display = "block";

        

    }
}

export default GamesDisplay;