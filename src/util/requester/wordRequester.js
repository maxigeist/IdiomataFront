import axios from "axios";

export class WordRequester{

    async getWords(language, category, difficulty, limit){
        if(category.length === 0) category = undefined
        if(difficulty.length === 0) difficulty = undefined
        
        try {
            const response = await axios.post('http://localhost:3001/api/word/wordlist', {
                language: language,
                category: category,
                difficulty: difficulty
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
            return response
        }catch(error){
            console.log(error)
            return error
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
                data: {id: Number(translationId)}
            })
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    async updateWord(oldWord, newWord){
        try {
            const response = await axios.post("http://localhost:3001/api/word/update", {
                oldWord: oldWord,
                newWord: newWord
                
            })
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    async uploadFileForWords(file){
        try {
            const formData = new FormData();
            formData.append(
            "file",
            file
        );
            const response = await axios.post("http://localhost:3001/api/word/upload", formData)
            return response
        } catch (error) {
            console.log(error)
            return error.response

        }
    }

    async uploadFileForTranslations(file){
        try {
            const formData = new FormData();
            formData.append(
            "file",
            file
        );
            const response = await axios.post("http://localhost:3001/api/word/upload/translations", formData)
            return response
        } catch (error) {
            console.log(error)
            return error.response

        }
    }
}

export default WordRequester