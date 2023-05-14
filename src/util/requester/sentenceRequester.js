import axios from "axios"

export class SentenceRequester{

    async createSentence(language, parts, answers){
        try {
            const res = await axios.post("http://localhost:3001/api/sentence", {
            language: language,
            parts: parts,
            wordsInEnglish: answers
            })
            return res.status
        } catch (error) {
            console.log(error)
        }
    }

    async searchSentence(language){
        try{
            const res = await axios.get("http://localhost:3001/api/sentence/" + language)

            return res.data
        }catch (error){
            console.log(error)
        }
    }
}