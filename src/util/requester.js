import axios from "axios";
import { getTokenFromDom } from "./domHandler";

class Requester{

    /**
     * Makes an http request to create a user
     * 
     * @param {String} name
     * @param {String} email 
     * @param {String} password 
     * @param {String} language
     * 
     */
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

    /**
     * Makes an http request to login a user. Returns a token as credential.
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {String} The resulting token or null if not found
     */
    async LoginUser(email, password){
        try{
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email: email,
                password: password
            })

            return response.data.token;
        }catch(error){
            return null;
        }
    }

    /**
     * Makes an http request to verify token validity. The token used is the one stored in the DOM
     * 
     * 
     * @returns {boolean} true if the request is successful, false otherwise.
     */
    async isAuth(){
        try{
            const result = await axios.get('http://localhost:3001/api/auth', {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            })

            if(result.status === 200) return true;

            else return false

        }catch(error){
            return false
        }

    }
}


export default Requester;