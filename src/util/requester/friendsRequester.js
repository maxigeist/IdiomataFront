import axios from "axios";
import { getTokenFromDom } from "../domHandler";

export class FriendsRequester{
    async sendFriendRequest(email){
        try{
            const response = await axios.post("http://localhost:3001/api/user/request", {
                userEmail: email
            },
            {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            }
            )
            return response
        }catch (error){
            return error.response
        }
    }

    async getRequests(){
        try{
            const response = await axios.get("http://localhost:3001/api/user/request",
            {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            }
            )
            return response
        }catch (error){
            return error.response
        }
    }

    async addFriend(id){
        try{
            const response = await axios.put("http://localhost:3001/api/user/addFriend",
            {
                id: id
            },
            {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            }
            )
            return response
        }catch (error){
            return error.response
        }
    }

    async rejectRequest(id){
        try{
            const response = await axios.delete("http://localhost:3001/api/user/request/"+id,
            {
                headers: {Authorization: "Bearer "+ getTokenFromDom()}
            }
            )
            return response
        }catch (error){
            return error.response
        }
    }
}