import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAMGh6CGPZHcpfl_mRwtPIxbAGyllQMzgs",
  authDomain: "info-340-rso-page.firebaseapp.com",
  projectId: "info-340-rso-page",
  storageBucket: "info-340-rso-page.appspot.com",
  messagingSenderId: "79505969035",
  appId: "1:79505969035:web:669198c65b27e8cc74e98e",
  measurementId: "G-NKZE7NCBLH"
};

// Initialize Firebase
initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

