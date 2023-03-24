import { Component } from "react";
import axios from "axios";



class Data extends Component{


    async saveRegisterData(name, email, password, language){
        try {
            const response = await axios.post('http://localhost:3001/api/user', {
                name: name,
                email: email,
                password: password,
                language: language 
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    saveLoginData(email, password){

    }

}

export default Data;