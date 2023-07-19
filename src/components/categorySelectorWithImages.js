import React, { Component } from "react";
import categoryRequester from "../util/requester/categoryRequester";
import "../style/categoryselector.css"

import suprisebox from "../resources/surprise-box.png"

class CategorySelectorWithImages extends Component{
    requester = new categoryRequester();

    constructor(props){
        super(props)
        this.t = this.props.t;
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
                <div className="d-flex flex-column flex-shrink-0 " style={{height:"100%",overflowY: "auto", width: "230px"}}>
                <this.makeOptions/>
                </div>
            </div>
        );
    }

    makeOptions(){
        console.log(this.state.urls)
        const options = this.state.categories.map((category, index) => (
            <div>
            <button value={category} key={index} className="w-100 btn btn-light rounded-0 catimages" style={{textAlign: "start"}} onClick={this.props.func}><img src={this.state.urls[index]} style={{height: 30, width: 30, marginRight:10}} alt="category"></img>{this.state.categories[index]}</button>
            </div>
        ))
        const result = [<button value={""} className="w-100 btn btn-light rounded-0 catimages h-100" style={{textAlign: "start"}} onClick={this.props.func}><img src={suprisebox}   style={{height: 30, width: 30, marginRight:10}} alt="random"></img>{this.t('global:header:All-categories')}</button>]
        return result.concat(options)
    }
}

export default CategorySelectorWithImages;