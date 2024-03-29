import axios from "axios";
import { alert } from "../alert";

class categoryRequester{

    /**
     * Makes an http request to create a Category
     * 
     * @param {String} Category name
     */


    async createCategory(name, img, t_func){
        try{
            const formData = new FormData();
            formData.append('file', img);
            formData.append('name', name);
            const response = await axios.post('http://localhost:3001/api/category',formData);
            console.log(response.status)
            return response.status;
            
        }
        catch(error){
            return alert("error", t_func("global:header:Category-already-exists"));
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
    async modifyCategory(name, new_name, img){
        try{
            const formData = new FormData();
            formData.append('file', img)
            formData.append('new_name', new_name)
            formData.append('name', name)
            const response = await axios.put('http://localhost:3001/api/category', formData);
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

    async getImageByName(name){
        try{
            const response = await axios.get('http://localhost:3001/api/category/images/'+name)
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }

      
}



export default categoryRequester;