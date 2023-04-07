import axios from "axios";
import { getTokenFromDom } from "../domHandler";

class AdminRequester{

    async LoginAdmin(email, password){
        try{
            const response = await axios.post('http://localhost:3001/api/auth/admin/login', {
                email: email,
                password: password
            })

            return response.data.token;
        }catch(error){
            return null;
        }
    }

    /**
     * Makes an http request to verify token validity for admins. The token used is the one stored in the DOM
     * 
     * 
     * @returns {boolean} true if the request is successful, false otherwise.
     */
    async isAuth(){
        try{
            const result = await axios.get('http://localhost:3001/api/auth/admin', {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            })

            if(result.status === 200) return true;

            else return false

        }catch(error){
            return false
        }

    }
}

export default AdminRequester;