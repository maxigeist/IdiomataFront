import { Component } from "react";
import categoryRequester from "../util/requester/categoryRequester";



class CategorySelector extends Component{

    requester = new categoryRequester();

    constructor(props){
        super(props)

        this.state = {categories: []}

        this.componentDidMount = this.componentDidMount.bind(this)
        this.makeSelectOptions = this.makeSelectOptions.bind(this);
    }

    async componentDidMount(){
        const categories = await this.requester.getAllCategories();
        this.setState({categories: categories})
    }

    render(){
        return(
            <select required className="form-select shadow-none" style={{margin:`${this.props.margin}`}}onChange={this.props.func}>
                <option value="">Choose Category</option>
                <this.makeSelectOptions/>
            </select>
        );
    }

    makeSelectOptions(){
        const options = this.state.categories.map((category, index) => (
            <option key={index} value={category}>{this.state.categories[index]}</option>
        ));
        return(
            options
        )
    }
}

export default CategorySelector;