
import { Component } from "react";
import ReadAndWrite from "../pages/readAndWrite";



class GamesDisplay extends Component{

    constructor(props){
        super(props);

        this.handleRaWClick = this.handleRaWClick.bind(this);
    }

    render(){


        return(
            
            <div className="d-flex" style={{height:"100%"}}>
                
                <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: "auto",height:"100%"}}>

    
    <ul class="nav nav-pills flex-column mb-auto justify-content-between" >
        
        
    <li class="nav-item mb-5" >
    <a href = "#" class="nav-link text-white text-align-center" style={{justifyContent:"center"}} onClick={this.handleRaWClick} >
    <svg class="bi me-2" width="16" height="16"></svg>
    Read and Write
    </a>
    </li>
    <li class="nav-item mb-5">
    <a href=" " class="nav-link text-white">
    <svg class="bi me-2" width="16" height="16"></svg>
    Memotest
    </a>
    </li>
    <li className="nav-item mb-5">
    <a href=" " class="nav-link text-white">
    <svg class="bi me-2" width="16" height="16"></svg>
    Audio
    </a>
    </li>
    
    </ul>
    </div>
        <div className="RAW-div" style = {{display:"none"}}>
        <ReadAndWrite/>

        </div>
            
            
    </div>

        )
    }

    handleRaWClick(event){
        event.target.className+=" active";
        document.querySelector(".RAW-div").style.display = "block";

        

    }
}

export default GamesDisplay;