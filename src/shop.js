import React, { useEffect, useState } from 'react'
import Nav from './nav';
import './shop.css';
import icon1 from "./images/expandIcon2.png";
import icon2 from "./images/heartIcon2.png";
import axios from "axios";
export default function Shop() 
{
  const[products,setProducts]=useState();



useEffect(()=>{
  async function fetchData()
  {
    console.log("iue");
    
    const retrievedValue = sessionStorage.getItem('accessToken');
            console.log(retrievedValue);
    try{
      const data=await axios.get("http://localhost:3001/product/allProducts",{
        headers:{
          authorization:retrievedValue}
      });
      console.log(data.data);
      setProducts(data.data);
    }
    catch(error)
    {
      console.log(error);
    }
  } 
  fetchData();
},[])

async function handleAddToCart(content)
{
  console.log("KIcnodc");
  console.log(content);
  const _id=sessionStorage.getItem("user_id");
  const retrievedValue=sessionStorage.getItem("accessToken");
  console.log(content.productName);
  try{

    const data=await axios.post("http://localhost:3001/product/addToCart",{user_id:_id,image:content.image,productName:content.productName,productprice:content.productprice,productKg:content.productKg},
    {
      headers:{
        authorization:retrievedValue}
    });
    console.log(data);
  }
  catch(error)
  {
    console.log(error);
  }
}
  return (
    <>
      <Nav/>
    <div className='container'>
     
      <div className='shop'>
        {
           products&& products.map((content,index)=>{
                
                
                return(
                    <div className='cards'>
                        <div className='iconBorder1'>
                        <img className="icon" src={icon2}></img>
                        </div>
                        <div className='iconBorder2'>
                        <img className="icon" src={icon1}></img>
                        </div>
                        <div/>
                        <img  className="cardImg" src={content.image}></img>
                    <h2>{content.productName}</h2>
                    <h2 className='price'>{content.productprice}$</h2>
                    <button onClick={()=>handleAddToCart(content)}>Add to cart</button>
                    </div>
                    
                );
            }
            )
        }
      </div>
    </div>
    </>
  )
}
