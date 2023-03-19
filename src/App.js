import './App.css'
import dict from "./Imagenes/993441.png"
import Registro from "./Componentes/register"
import React from 'react';
import {Link, NavLink, Route, Router, Routes, Switch, useNavigate} from 'react-router-dom';



function App() {
    const navigate = useNavigate();


    
  return (
    <div className="App">
      <div className='logo-contenedor'>
        <img
          className='logo'
          src = {dict}
          alt = "logo de Idiomata"
          />
      </div>
      <h1 className="titulo">Idiomata</h1>

        <div className='formulario-div'>
      <form className='formulario'>
        <input type="email" placeholder = "Email" required/>
        <input type='password' placeholder = "Password" required/>
          <button className='boton-submit'>Log In</button>
          <button onClick={handleClick}></button>

      </form>

           </div>
    </div>
  );
}

export default App;


//el src no se puede usar como para modificar en un archivo de css, conviene usar el nombre de la clase que le di a la imagen.