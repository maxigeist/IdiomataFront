import axios from "axios";
import { getTokenFromDom } from "../domHandler";

class UserRequester{

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
            return response
        } catch (error) {
            return error
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

    async logOutUser(){
        try {
            const response = await axios.delete('http://localhost:3001/api/auth/logout', {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            })

            return response.status
        } catch (error) {
            console.log(error);
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


    //returns json with user information
    async getUserData(){
        try {
            const data = await axios.get('http://localhost:3001/api/user/userData', {
                headers: {Authorization: "Bearer: "+ getTokenFromDom()}
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async changeUserPassword(newPassword){
        try {
            const update = await axios.put('http://localhost:3001/api/user/updatePassword',
                {password: newPassword},
                {headers: {Authorization: "Bearer: "+ getTokenFromDom()}}
            )
            return update.status
        } catch (error) {
            console.log(error)
        }
    }

    async changeUserEmail(newEmail){
        try {
            const update = await axios.put('http://localhost:3001/api/user/updateEmail',
                {email: newEmail},
                {headers: {Authorization: "Bearer: "+ getTokenFromDom()}},
                )
            return update
        } catch (error) {
            return error
        }
    }

    async changeUserLanguage(newLanguage){
        try {
            const update = await axios.put('http://localhost:3001/api/user/updateLanguage',
                {language: newLanguage},
                {headers: {Authorization: "Bearer: "+ getTokenFromDom()}},
                )
            return update.status
        } catch (error) {
            return error.response.status
        }
    }

    async deleteUser(userEmail){
        try {
            const response = await axios.delete('http://localhost:3001/api/user/' + userEmail )
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    async getUserLanguage(){
        try {
            const response = await axios.get('http://localhost:3001/api/user/userLanguage' , {
                headers: {Authorization: "Bearer: "+ getTokenFromDom()}
            })
            
            return response.data
        } catch (error) {
            return error.response
        }
    }

    async getFriends(){
        try {
            const response = await axios.get('http://localhost:3001/api/user/friends', {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            })
            return response.data
        } catch (error) {
            return error.response
        }
    }

    async removeFriend(id){
        try {
            const response = await axios.delete('http://localhost:3001/api/user/friend/'+id, {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            })
            return response
        } catch (error) {
            return error.response
        }
    }
}

export default UserRequester;