import React, { useEffect, useState } from 'react'
import Nav from './nav';
import "./cart.css";
import axios from 'axios';
import deleteIcon from "./images/delete.png";

export default function Cart() 
{
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
    async function fetchCart()
    {
        try{
            const retrievedValue = sessionStorage.getItem('accessToken');

            const cartItems=await axios.get("http://localhost:3001/product/displayCart",
            {
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
        fetchCart();
    },[])

   async function handleDelete(data)
   {
    try{
        console.log(data._id);
        const retrievedValue = sessionStorage.getItem('accessToken');

        const result = await axios.delete("http://localhost:3001/product/deleteCart", {
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
