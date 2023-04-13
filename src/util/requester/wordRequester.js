import axios from "axios";

class WordRequester{

    async getWords(language, category, difficulty, limit){
        try {
            const response = await axios.get('http://localhost:3001/api/word', {
                language: language,
                category: category,
                difficulty: difficulty,
                limit: limit,
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default WordRequester;