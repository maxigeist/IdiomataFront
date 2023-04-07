import axios from "axios";

class AdminRequester{

    async LoginAdmin(email, password){
        try{
            const response = await axios.post('http://localhost:3001/api/auth/admin/login', {
                email: email,
                password: password
            })

            return response.data.token;
        }catch(error){
            return null;
        }
    }
}

export default AdminRequester;