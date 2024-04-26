import React, { useEffect, useState } from 'react'
import Nav from './nav';
import "./cart.css";
import axios from 'axios';
import deleteIcon from "./images/delete.png";
import register from "./images/register.jpg"
import { useNavigate } from 'react-router-dom';
export default function Cart() 
{
    const navigate=useNavigate();
    const[items,setItems]=useState();

    function handleIncrease(index)
    {
       
        let updateItems=[...items];
        updateItems[index].productKg+=10;
        console.log(updateItems[index].productKg);
        console.log(updateItems);
    setItems(updateItems);
    }
    function handleReduce(index)
    {
        let updateItems=[...items];
        updateItems[index].productKg-=10;
    setItems(updateItems);
    }
    const retrievedValue = sessionStorage.getItem('accessToken');
    async function fetchCart()
    {
        try{
            const user_id = sessionStorage.getItem('user_id');

            const cartItems=await axios.get("https://agro-backend-xn9u.onrender.com/product/displayCart",
            {
            params: {
                user_id: user_id
            }
            ,
                headers:{
                  authorization:retrievedValue}
              });

              console.log(cartItems.data);
              setItems(cartItems.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
    if(!retrievedValue)
    {
      alert("Login or Register to continue");
      navigate("/login");
    }
        fetchCart();
    },[])

   async function handleDelete(data)
   {
    try{
        console.log(data._id);
        const retrievedValue = sessionStorage.getItem('accessToken');

        const result = await axios.delete("https://agro-backend-xn9u.onrender.com/product/deleteCart", {
            headers: {
                authorization: retrievedValue
            },
            data: {
                _id: data._id
            }
        });
        console.log("sucessfully removed");
    }
    catch(error)
    {
        fetchCart();
        console.log(error);
    }
   }
   let total=0;
  return (
    <>
      <Nav/>
      <div className="image">
        <img className="registerImg" src={register}></img>
      <div className="myAccount" style={{top:"35%"}}>
        <h1>My Cart</h1>
        <span>Place Order</span>
        </div>
      </div>

        <div >
            
            <div className='box'>
               
                <div className='items1' >
                    <h4>Remove</h4>
                   <h4 >Image </h4>
                    <h3>Product</h3>
                    <h3>Price</h3>
                    <h3>Quantity</h3>
                    <h3>SubTotal</h3>
                </div>
                
                {
                    
                    items&&items.map((data,index)=>{
                        const price=data.productKg*data.productprice;
                        total+=price;
                        return(
                        <div className='items' style={{border:"2px solid #e9f1ee"}}>
                             <img className='deleteIcon' src={deleteIcon} onClick={()=>handleDelete(data)}></img>
                           
                        <img  src={data.image}></img>
      
         
                        <h3 >{data.productName}</h3>
                      
                    <h3 style={{textAlign:'left',width:'100px'}}>{data.productprice}$</h3>
                    <div className='quantity'>
                        <button onClick={()=>handleReduce(index)}>-</button>
                    <h3>{data.productKg}</h3>
                   
                   <button onClick={()=>handleIncrease(index)}>+</button>
                   
                   </div>
                    <h3>{price}</h3>
                        </div>
                        );
                    })
                }
               
                   
              
            </div>
            <div className='box2'>
            <div style={{width:"50%",display:"flex",justifyContent:"space-around ",border:"2px solid #e9f1ee",backgroundColor:"#e9f1ee"}}>
                    <h1 style={{width:"200px"}}>Cart Items</h1>
                   
                </div>
                <div style={{width:"50%",display:"flex",justifyContent:"space-around ",border:"2px solid #e9f1ee"}}>
                    <h1 style={{width:"200px"}}>Sub total</h1>
                    <h1>${total}</h1>
                </div>
                <div style={{width:"50%",display:"flex",justifyContent:"space-around ",border:"2px solid #e9f1ee"}}>
                    <h1 style={{width:"200px"}}>  Total</h1>
                    <h1>${total}</h1>
                </div>
                <button>Place Order</button>
            </div>
        </div>
       
     
    </>
  )
}
