import axios from "axios";

export class WordRequester{

    async getWords(language, category, difficulty, limit){
        if(category.length === 0) category = undefined
        try {
            const response = await axios.post('http://localhost:3001/api/word/wordlist', {
                language: language,
                category: category
        } );
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

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

    async searchWord(word){
        try{
            const response = await axios.get("http://localhost:3001/api/word/translation/" + word)
            return response.data
        }catch(error){
            console.log(error)
        }
    }

    async deleteWord(word){
        try {
            const response = await axios.delete("http://localhost:3001/api/word", {
                data:{inEnglish: word}
            })
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    async deleteTranslation(translationId){
        try {
            const response = await axios.delete("http://localhost:3001/api/word/translation", {
                id: translationId
            })
            return response.status
        } catch (error) {
            console.log(error)
        }
    }
}

export default WordRequester