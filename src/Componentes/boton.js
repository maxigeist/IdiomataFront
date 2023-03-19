
import "../hojas-de-estilo/button.css"

function Button({text, isClickButton, manageClick}){
  return(
    <button
      className={isClickButton ? "click_button" : "restart-button"}
      onClick = {manageClick}>
        {text}
      </button>

      
    


  
   
  );
}
export default Button;