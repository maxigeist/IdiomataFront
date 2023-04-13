import languageRequester from "../util/requester/languageRequester";


const languagedataRequester = new languageRequester();

class lanOptions{
    constructor(props){
        super(props);
        this.state = {languages: ""}
        
    }

    async uploadLan(){
        const languagesinfo = await languagedataRequester.getAllLanguages();
        this.setState({languages: languagesinfo})
    }



    //Hay que ver una forma de levantar los datos del array y hacer las options
    render(){

        return(
            {for(language in this.state.languages){
                return <select></select>
            }}



        );


    }
}