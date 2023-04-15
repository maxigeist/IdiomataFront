import axios from "axios";




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
            console.log(response);
        }
        catch(error){
            console.error(error);
        }
    }

    /**
     * Makes an http request to delete a Language
     * 
     * @param {String} Language name
     */

    async deleteLanguage(name){
        try{
            const response = await axios.post('http://localhost:3001/api/language',{
                name:name

            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }



    }

    async getAllLanguages(){
        try {
            const response = await axios.get('http://localhost:3001/api/language')

            return response.data
        } catch (error) {
            console.log(error);
        }
    }

}
    











export default languageRequester;