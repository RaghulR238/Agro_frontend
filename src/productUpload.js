  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import Nav from "./nav";
  import "./productUpload.css";
import { useNavigate } from "react-router-dom";
  export default function ProductUpload() 
  {
    const retrievedValue = sessionStorage.getItem('accessToken');
    const navigate=useNavigate();
    useEffect(()=>{
      if(!retrievedValue)
    {
      alert("Login or Register to continue");
      navigate("/login");
    }
    },[])
    const[file,setFile]=useState();
    const [productData, setProductData] = useState({
      productName: '',
      productKg: '',
      productprice: '',
      delivery: false,
      deliveryPlace: '',
      productLocation: '',
      details: ''
    });

    const cloudUpload=async(file)=>{
      const data=new FormData();
      data.append("file",file);
      console.log(file);
      data.append("upload_preset","fiverr");

      try{
        const res=await axios.post("https://api.cloudinary.com/v1_1/dxqhpt91q/image/upload",data)
        console.log("result while uploading to cloudinary  : ",res.data.secure_url);
        return res.data.secure_url;
      }
      catch(err){
        console.log("Error on uploading Image  :  ",err);
      }
    }
    async function handleUpload(e)
    {
      e.preventDefault();
      console.log(file)
      const image=await cloudUpload(file);
      const retrievedValue = sessionStorage.getItem('accessToken');
            console.log(retrievedValue);
            try{

              const data=await axios.post("http://localhost:3001/product/upload",
              {
                ...productData,
                image:image
              }
            ,{
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
        <Nav />
        <h1 style={{ color: "#50a464", textAlign: "center", fontWeight: "bold" }}>
          Upload Porduct
        </h1>
        <div className="outer">
          <div className="inner1">
            <div className="innerBox">
              <label>Product Name</label>
              <br></br>
              <input type="text" onChange={(e)=>setProductData(prev=>({...prev,productName:e.target.value}))}></input>

              <br></br>
              <label>Product Image</label>
              <br></br>
              <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
              <br></br>
              <label>Product KG</label>
              <br></br>
              <input type="text" onChange={(e)=>setProductData(prev=>({...prev,productKg:e.target.value}))}></input>
              <br></br>
              <label>Product Price</label>
              <br></br>
              <input type="text" onChange={(e)=>setProductData(prev=>({...prev,productprice:e.target.value}))}></input>
              <br></br>
              <label>Product Details</label>
              <br></br>
              <input type="text" onChange={(e)=>setProductData(prev=>({...prev,details:e.target.value}))}></input>
              <br></br>
              <label>Product Location</label>
              <br></br>
              <input type="text" onChange={(e)=>setProductData(prev=>({...prev,productLocation:e.target.value}))}></input>
              <br></br>
              <br></br>
              <label>Delivery</label>
              <br></br>
              <div
                style={{ display: "flex", justifyContent: "left", width: "25%" }}
              >
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                  style={{ height: "20px" }}
                ></input>
                  <label for="html">Yes</label> {" "}
                <input
                  type="radio"
                  id="css"
                  name="fav_language"
                  value="CSS"
                  style={{ height: "20px" }}
                ></input>
                  <label for="css">No</label> {" "}
              </div>
              <br></br>
              <label>Delivery Place</label>
              <br></br>
              <input type="text" onChange={(e)=>setProductData(prev=>({...prev,deliveryPlace:e.target.value}))}></input>
              <br></br>
              <button className="b1" onClick={handleUpload}>Upload Product</button>
            </div>
          </div>
        </div>
      </>
    );
  }
