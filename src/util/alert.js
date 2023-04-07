import Swal from "sweetalert2"
// eslint-disable-next-line no-unused-vars
import { SweetAlertIcon } from "sweetalert2"

/**
 * 
 * Throws a Swal alert
 * 
 * @param {SweetAlertIcon} icon 
 * @param {string} title
 * @param {string} text
 */
export function alert(icon, title, text){
    Swal.fire({
        icon: icon,
        titleText: title,
        text: text,
        position:"top",
        padding: "3em 3em 3em 3em"
    })
}