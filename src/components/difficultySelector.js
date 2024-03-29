import { Component } from "react";




class DifficultySelector extends Component{
    

    constructor(props){
        super(props)
        this.t = this.props.t;

        this.makeSelectOptions = this.makeSelectOptions.bind(this);
    }


    render(){
        return(
            <select required className="form-select shadow-none" style={{margin:`${this.props.margin}`, width:`${this.props.width}`}}onChange={this.props.func} >
                <option value="">{this.t("global:header:Difficulty")}</option>
                <this.makeSelectOptions/>
            </select>
        );
    }

    makeSelectOptions(){
        const difficulties = ["EASY", "MID", "HARD"];


        const options = difficulties.map((difficulty, index) => (
            <option key={index} value={difficulty}>{this.t(`global:header:${difficulties[index]}`)}</option>
        ));
        return(
            options
        )
    }

}


export default DifficultySelector;
