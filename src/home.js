import React from 'react'
import Nav from './nav'
import "./home.css";
import wall2 from "./images/wallpaper2.jpg";
export default function Home() {
  return (
    <div>
      <Nav/>
      <div className="image1">
        <img className="registerImg1" src={wall2}></img>
      <div className="myAccount1">
        <h1 style={{fontSize:"70px"}}>Agriculture Farming</h1>
        <h1 style={{fontSize:"70px"}}>Products</h1>
        <span>Our agriculture project aims to revolutionize farming practices</span>
        <br></br> <span>through sustainable technology solutions and community empowerment.</span>
        </div>
      </div>

    </div>
  )
}
