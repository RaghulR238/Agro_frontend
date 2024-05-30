import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Shop from './shop';
import {BrowserRouter,  Route, Routes } from 'react-router-dom'
import ProductUpload from './productUpload';
import Cart from './cart';
import Home from './home';
import PlantUpload from './plantUpload';
import AboutUs from './about';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route exact path="/login" element={<App/>}></Route>
    <Route exact path="/shop" element={<Shop/>}></Route> 
    <Route exact path="/productUpload" element={<ProductUpload/>}></Route>
    <Route exact path="/plantUpload" element={<PlantUpload/>}></Route> 
    <Route exact path="/cart" element={<Cart/>}></Route>   
    <Route exact path="/about" element={<AboutUs/>}></Route>  
</Routes>
    </BrowserRouter>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
