import { Component } from "react";

class GamesDisplay extends Component{

    render(){

        return(
        <div className="Games-display">
                    
            <button className="game-button" onClick={this.handleRaWClick}>Read and Write</button>
            <button className="game-button">Memotest</button>
            <button className="game-button">Play</button>
        </div>
        )
    }

    handleRaWClick = () => window.location.href = "/readAndWrite";
}

export default GamesDisplay;