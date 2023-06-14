import axios from "axios"

export class SentenceRequester{

    async createSentence(language, parts, answers, difficulty){
        try {
            const res = await axios.post("http://localhost:3001/api/sentence", {
            language: language,
            parts: parts,
            wordsInEnglish: answers,
            difficulty: difficulty
            })
            return res.status
        } catch (error) {
            return error.response.status
        }
    }

    async searchSentence(language, difficulty){
        const finalDifficulty = difficulty 
        if(difficulty.length === 0) {difficulty = undefined}
        try{
            const res = await axios.get("http://localhost:3001/api/sentence?language=" + language+"&difficulty="+finalDifficulty)

            return res.data
        }catch (error){
            console.log(error)
        }
    }

    async deleteSentence(sentenceId){
        try {
            const res = await axios.delete("http://localhost:3001/api/sentence/" + sentenceId)

            return res.status
        } catch (error) {
            console.log(error)
        }
    }

    async updateSentence(sentenceId, language, parts, answers){
        try {
            const res = await axios.put("http://localhost:3001/api/sentence", {
            id: sentenceId,
            language: language,
            parts: parts,
            blanks: answers
            })
            return res.status
        } catch (error) {
            return error.response.status
        }
    }
}