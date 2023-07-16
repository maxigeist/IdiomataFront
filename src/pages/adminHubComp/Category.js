import { Component } from "react";
import categoryRequester from "../../util/requester/categoryRequester";
import AbsCateLan from "./AbsCateLan";


const categorydataRequester = new categoryRequester();

class Category extends Component{

    constructor(props){
        super(props);
        this.t= this.props.t;
        this.state = {active:"",categories:[]};
        this.refresh = this.refresh.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.inactiveElements = this.inactiveElements.bind(this);
        this.makeLiOptions = this.makeLiOptions.bind(this);
        this.makeActive = this.makeActive.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    async componentDidMount(){
        const categories = await categorydataRequester.getAllCategories();
        this.setState({categories: categories})        
    }

    render(){
        return(
                <this.makeLiOptions/>
        );
    }

    makeLiOptions(){    
        var options ="";
            options = this.state.categories.map((category, index) => (
                <li className="list-group-item " id={category} onClick={this.makeActive} key={index} value={category} style={{userSelect:"none"}}>{this.state.categories[index]}</li>
            ));
        
        return(

            <div class="d-flex div-1 col-sm" >
                <div class="w-25 ms-5">
                    <ul className="list-group">
                    {options}
                    
                    </ul>
                </div>
                <AbsCateLan to="Category" active={this.state.active} refresh={this.refresh}/>


        </div>
            
        )
    
    }
    async makeActive(event){
        if (event.target.classList.contains("active")){
            event.target.classList.remove("active");
            await this.setState({active: ""});
            
        }
        else{
            this.inactiveElements();
            event.target.classList.add("active");
            await this.setState({active: event.target.id});
            
        }


    }

    inactiveElements(){
        document.querySelectorAll(".list-group-item").forEach((element) => {
            element.classList.remove("active")
            }
        )
        this.setState({active: ""});

    }
    async refresh(){
        this.inactiveElements();
        await this.componentDidMount();
        
    }
    

}

export default Category;