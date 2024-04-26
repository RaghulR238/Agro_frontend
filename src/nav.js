import "./nav.css";
import registerImg from "./images/registerImg2.jpg";
import cartIcon from "./images/cartIcon.png"
import {useNavigate} from "react-router-dom";
import { useState } from "react";
export default function Nav() {

  let retrievedValue=sessionStorage.getItem("userName");
  const navigate=useNavigate();
  const[logout,setLogout]=useState(false);
  const type=sessionStorage.getItem("userType");
  function handleLogout()
  {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userType");
    window.location.reload(); 
  }
  function handleUpload()
  {
    if(type=="farmer")
    {
      navigate("/productUpload");
    }
    else{
      alert("You must be farmer to Upload Product");
    }
  }
  return (
    <div className="landing" >
      <div className="navBar" >
        <div className="logo">
          <h1 style={{color:"#50a464",cursor:'pointer'}} onClick={()=>navigate("/")} >Agro  Assistant</h1>
        </div>
        <div className="navCenter">
         <h1 onClick={()=>navigate("/")}>Home </h1>
         <h1 onClick={()=>navigate("/shop")}>Shop</h1>
          <h1 >About</h1>
          <h1 onClick={handleUpload}>UploadProducts</h1>
          <img onClick={()=>navigate("/cart")} src={cartIcon} style={{width:'20px',height:"20px",marginTop:"18px",borderRadius:'50%',padding:"15px",backgroundColor:"#cfe6ff"}}></img>
        </div>
      
        {
          retrievedValue?<h1 style={{color:"#50a464",cursor:"pointer"}} onClick={()=>setLogout(!logout)}  className="user">{retrievedValue}</h1>:
          <button style={{cursor:"pointer"}} className="register"  onClick={()=>navigate("/login")}>Register</button>
        }
          
      
      </div>
       {(logout)&& <button className="logout" onClick={handleLogout}>Logout</button>}
      
    </div>
  );
}
