import { Component } from "react";



class GameSelector extends Component{

    constructor(props){
        super(props);
        this.t = this.props.t;
    }



    render(){
        return(

            <select required className="form-select shadow-none" style={{margin:`${this.props.margin}`}}onChange={this.props.func}>
                <option value="">{this.t("global:header:Game")}</option>
                <option value={"TranslateIt"}>{this.t("global:header:Translate-it")}</option>
                <option value={"FillInTheGaps"}>{this.t("global:header:Fill-in-the-gaps")}</option>
            </select>



        );
    }


}


export default GameSelector;
