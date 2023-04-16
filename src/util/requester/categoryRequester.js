import axios from "axios";

class categoryRequester{

    /**
     * Makes an http request to create a Category
     * 
     * @param {String} Category name
     */


    async createCategory(name){
        try{
            const response = await axios.post('http://localhost:3001/api/category',{
                name:name
            });
            console.log(response);
        }
        catch(error){
            console.error(error);
        }
    }

    /**
     * Makes an http request to delete a Category
     * 
     * @param {String} Category name
     */

    async deleteCategory(name){
        try{
            const response = await axios.delete('http://localhost:3001/api/category',{
                data:{
                    name:name
                }
            });
                
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    /**
     * Makes an http request to modify a Category
     * 
     * @param {String} Category name
     * @param {String} new Category name
     */
    async modifyCategory(name, new_name){
        try{
            const response = await axios.put('http://localhost:3001/api/category',{
                name:name,
                new_name:new_name 
            });
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    async getAllCategories(){
        try{
            const response = await axios.get('http://localhost:3001/api/category')
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }


    
}



export default categoryRequester;