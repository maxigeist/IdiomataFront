import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import OurRoutes from "./routes/routes";
import {I18nextProvider} from "react-i18next" //Con esto desde cualquier lado tenemos acceso a todas las traducciones.
import I18n from './components/i18ncomponent';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={I18n.i18n}>
     <OurRoutes></OurRoutes>
     </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

