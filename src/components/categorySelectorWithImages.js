import React, { Component } from "react";
import categoryRequester from "../util/requester/categoryRequester";

class CategorySelectorWithImages extends Component{
    requester = new categoryRequester();

    constructor(props){
        super(props)

        this.state = {categories: [], urls: []}
        this.componentDidMount = this.componentDidMount.bind(this)
        this.makeOptions = this.makeOptions.bind(this)
        this.getURLs = this.getURLs.bind(this)
    }

    async componentDidMount(){
        const categories = await this.requester.getAllCategories();
        this.setState({categories: categories})
        this.setState({urls: this.getURLs(categories)})
    }

    getURLs(categories){
        const urls = []
        for (const category in categories) {
            urls.push('http://localhost:3001/api/category/images/'+categories[category])
        }
        return urls
    }

    render(){
        return(
            <div>
                <this.makeOptions/>
            </div>
        );
    }

    makeOptions(){
        console.log(this.state.urls)
        const options = this.state.categories.map((category, index) => (
            <div>
            <button value={category} key={index} onClick={this.props.func}><img src={this.state.urls[index]} style={{height: 30, width: 30}}></img>{this.state.categories[index]}</button>
            </div>
        ))
        options.push(<button value={""} onClick={this.props.func}><img></img>All categories</button>)
        return options
    }
}

export default CategorySelectorWithImages;