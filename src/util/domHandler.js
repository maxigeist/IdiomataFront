/**
 * This function saves a token passed as an argument to the windows dom
 * 
 * @param {String} token An authentication token
 * 
 */
export function saveTokenToDom(token){
    localStorage.setItem("currentToken", token)
}

/**
 * This function saves a token passed as an argument to the windows dom
 * 
 * @returns {String} A token if stored
 * 
 */
export function getTokenFromDom(){
    return localStorage.getItem("currentToken")
}