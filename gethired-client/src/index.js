import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

import { render } from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import App from './pages/AppPage/App';

ReactDOM.render(
  <BrowserRouter>
    <App /> 
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
