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
 * This function gets the user token saved in Dom
 * 
 * @returns {String} A token if stored
 * 
 */
export function getTokenFromDom(){
    return localStorage.getItem("currentToken")
}

export function deleteTokenFromDom(){
    return localStorage.removeItem("currentToken")
}