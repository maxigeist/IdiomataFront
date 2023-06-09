import UserRequester from "./requester/userRequester"
import AdminRequester from "./requester/adminRequester"

const userRequester = new UserRequester();
const adminRequester = new AdminRequester();

/**
 * Checks weather token saved in dom is valid or not
 * 
 * @returns {Promise<boolean>} true if token is invalid, false otherwise
 */
export async function pageAuth(){

    if(!await userRequester.isAuth()) {
        return true
    }

    return false
}

/**
 * Checks weather token saved in dom is valid or not for admin users
 * 
 * @returns {Promise<boolean>} true if token is invalid, false otherwise
 */
export async function AdminPageAuth(){

    if(!await adminRequester.isAuth()) {
        return true
    }

    return false
}




    