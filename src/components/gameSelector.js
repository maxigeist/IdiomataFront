import { Component } from "react";



class GameSelector extends Component{



    render(){
        return(

            <select required className="form-select shadow-none" style={{margin:`${this.props.margin}`}}onChange={this.props.func}>
                <option value="">Game</option>
                <option value={"TranslateIt"}>Translate It</option>
                <option value={"FillInTheGaps"}>Fill In The Gaps</option>
            </select>



        );
    }


}


export default GameSelector;
