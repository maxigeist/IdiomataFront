import axios from "axios";
import { getTokenFromDom } from "../domHandler";

export class StatsRequester{

    async sendWordAttempt(inEnglish, language, translationId, isCorrect){
        try{
            await axios.post("http://localhost:3001/api/stats/wordAttempt", 
                {translationId: translationId, language: language, correct: isCorrect, word: inEnglish},
                {headers: {Authorization: "Bearer: "+ getTokenFromDom()}},
            )
        }catch(e){
            console.log(e)
        }
    }

    async getWordsAttempt(language, category){
        try{
            const attempts = await axios.get("http://localhost:3001/api/stats/wordAttempt",
                {params: {language:this.checkIfVoid(language), category:this.checkIfVoid(category)},
                headers: {Authorization: "Bearer: "+ getTokenFromDom()}},
            )
            console.log(attempts.data)
            return attempts.data;
        }catch(e){
            console.log(e)
        }
    }

    async getlistWithWordAttempts(language, category){
        try{
            const attempts = await axios.get("http://localhost:3001/api/stats/wordAttempt/errorsByWord",
                {params: {language:this.checkIfVoid(language), category:this.checkIfVoid(category)},
                headers: {Authorization: "Bearer: "+ getTokenFromDom()}},
            )
            return attempts.data;
        }catch(e){
            console.log(e)
        }

    }


    checkIfVoid(option){
        if(option === ""){
            return null;
        }
        else{
            return option;
        }
    }

}