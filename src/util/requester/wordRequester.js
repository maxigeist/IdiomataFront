import axios from "axios";

export class WordRequester{
    
    async createWord(word, category){
        try{
            const response = await axios.post("http://localhost:3001/api/word", {
            inEnglish: word,
            category: category
            })
            return response.status
        }catch(error){
            console.log(error)
        }
    }

    async addTranslation(word, translation, difficulty, language){
        try{
            const response = await axios.post("http://localhost:3001/api/word/translation", {
                word: word,
                translated: translation,
                difficulty: difficulty,
                language: language
            })
            return response.status
        }catch(error){
            console.log(error)
        }
    }
}