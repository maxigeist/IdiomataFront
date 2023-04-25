import axios from "axios";
import {alert} from "../alert";




    /**
     * Makes an http request to create a Language
     * 
     * @param {String} Language name
     */

class languageRequester{
    async createLanguage(name){
        try{
            const response = await axios.post('http://localhost:3001/api/language',{
                name:name
            });
            console.log(response)
        }
        catch(error){
            return alert("error", "Language already exists");
        }
        
    }

    /**
     * Makes an http request to delete a Language
     * 
     * @param {String} Language name
     */

    async deleteLanguage(name){
        try{
            const response = await axios.delete('http://localhost:3001/api/language',{
                data:{
                    name:name

                }
            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    async modifyLanguage(name, new_name){
        try{
            const response = await axios.put('http://localhost:3001/api/language',{
                name: name,
                newname:new_name
            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }

    }

    async getAllLanguages(){
        try{
            const response = await axios.get('http://localhost:3001/api/language')
                return response.data;   
        }
        catch(error){
            console.log(error)
        }
    }

}
    











export default languageRequester;