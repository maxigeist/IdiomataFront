import axios from "axios";
import { getTokenFromDom } from "../domHandler";

export class StatsRequester{

    async sendWordAttempt(inEnglish, translationId, isCorrect){
        try{
            await axios.post("http://localhost:3001/api/stats/wordAttempt", 
                {translationId: translationId, correct: isCorrect, word: inEnglish},
                {headers: {Authorization: "Bearer: "+ getTokenFromDom()}},
            )
        }catch(e){
            console.log(e)
        }
    }
}