import React, { useEffect, useState } from 'react'
import Nav from './nav';
import './shop.css';
import icon1 from "./images/expandIcon2.png";
import icon2 from "./images/heartIcon2.png";
import wall3 from "./images/wallpaper3.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Shop() 
{
  const[products,setProducts]=useState();
  const navigate=useNavigate();


  const retrievedValue = sessionStorage.getItem('accessToken');
  async function fetchData()
  {
    if(!retrievedValue)
    {
      alert("Login or Register to continue");
      navigate("/login");
    }
    console.log("iue");
    
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
useEffect(()=>{
  
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

async function handleSorting(e) 
{
  console.log(e);
  const retrievedValue = sessionStorage.getItem('accessToken');
            console.log(retrievedValue);
    try{
      let data;
      if(e=="high")
      {

        data=await axios.get("http://localhost:3001/product/allProductsSortHigh",{
          headers:{
            authorization:retrievedValue}
        });
      }
      else if(e=="low"){
        data=await axios.get("http://localhost:3001/product/allProductsSortLow",{
          headers:{
            authorization:retrievedValue}
        });
      }
      else
      fetchData();
      console.log(data.data);
      setProducts(data.data);
    }
    catch(error)
    {
      console.log(error);
    }

}
async function handleSearch(e)
{
  const retrievedValue = sessionStorage.getItem('accessToken');
  const data=await axios.get("http://localhost:3001/product/allProductsSearch",{params:{
    search:e.target.value
  },
    headers:{
      authorization:retrievedValue}
  });
  console.log(data);
  setProducts(data.data);
}

  return (
    <>
      <Nav/>
      <div className="image">
        <img className="registerImg" src={wall3}></img>
      <div className="myAccount" style={{top:"35%"}}>
        <h1>Shopping</h1>
        <span>Buy/Sell</span>
        </div>
      </div>

    <div className='container'>
      
    <div className='sorting'>            
    <input type='search' placeholder='search' style={{width:"500px",borderRadius:"35px",border:"2px solid #cbd4d1"}} onChange={(e)=>handleSearch(e)}></input>
                    <select style={{width:"300px"}} onClick={(e)=>handleSorting(e.target.value)}>
                          <option>Default Sorting</option>
                          <option value="low">Lowest Price</option>
                          <option value="high">Highest Price</option>
                    </select> 
    </div>
      <div className='shop'>
        {
           products? products.map((content,index)=>{
                
                
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
            ):<p style={{color:"red"}}>Please Login/Register to continue</p>
        }
      </div>
    </div>
    </>
  )
}