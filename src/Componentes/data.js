import React from "react";
import Login from "../login"

function Fill(){
    var element = "../login".getElementById('email_input')
    var element2 = "../login".getElementById('password')
    console.log(element.value)
    //Estos dos elements contiene la información de lo que se escribió para intentar de iniciar sesión

}
export default Fill;