import "./loginpage.css";
import wall4 from "./images/wallpaper4.jpg";
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
export default function LoginPage()
{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[userType,setUserType]=useState('');
    const[userName,setUserName]=useState('');
    const[contactNumber,setContactNumber]=useState('');

    const navigate=useNavigate();
    
    
    async function handleLogin()
    {
        try{

            console.log("Trying to login front end");            
            const data=await axios.post("https://agro-backend-xn9u.onrender.com/user/login",{email:email,password:password,userType:userType});
            console.log(data);
            sessionStorage.setItem('accessToken', data.data.accessToken);
            sessionStorage.setItem('user_id', data.data.userDetails._id);
            sessionStorage.setItem('userName', data.data.userDetails.userName);
            sessionStorage.setItem('userType', data.data.userDetails.userType);
            const retrievedValue = sessionStorage.getItem('accessToken');
            console.log(retrievedValue); 
            navigate("/shop");
        }
        catch(error)
        {
            alert(error.response.data);
            console.log(error.response.data);
        }
    }
    async function handleRegister()
    {
        try{

            console.log("Trying to register");    
            console.log(password,userName,contactNumber);           
            const data=await axios.post("https://agro-backend-xn9u.onrender.com/user/signUp",{email:email,password:password,userType:userType,contactNumber:contactNumber,userName:userName});
            console.log(data);
            sessionStorage.setItem('accessToken', data.data.accessToken);
            sessionStorage.setItem('user_id', data.data.userDetails._id);
            const retrievedValue = sessionStorage.getItem('accessToken');
            console.log(retrievedValue); 
            navigate("/shop");
        }
        catch(error)
        {
            alert(error.response.data);
            console.log(error);
        }
    }
    return(
        <>
        <div className="image">
        <img className="registerImg" src={wall4}></img>
      <div className="myAccount" style={{top:"35%"}}>
        <h1 >My Account</h1>
        <span>Login/Sign Up</span>
        </div>
      </div>

      <div className="outer">
        <div className="inner1">
            <h1 >Login</h1>
            <div className="innerBox">
               
                <label>
                    Email Address *
                </label>
                <br></br>
                <input type="text" onChange={(e)=>setEmail(e.target.value)}>
                </input>
                <br></br>
                <label>
                    Password *
                </label>
                <br></br>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}>
                </input>
                <br></br>
                <label>
                    Type *
                </label>
                <br></br>
                <select onClick={(e)=>setUserType(e.target.value)}>
                    <option value="farmer">
                        Farmer
                    </option>
                    <option value="customer">
                        Customer
                    </option>
                    <option value="shopIncharge">
                        Shop Incharge
                    </option>
                </select>
                <br></br>
                <button className="b1" onClick={handleLogin}>Log In</button>
            </div>
        </div>
        <div className="inner1">
            <h1 >Register </h1>
            <div className="innerBox">
            <label>
                    UserName *
                </label>
                <br></br>
                <input type="text" onChange={(e)=>setUserName(e.target.value)}>
                </input>
                <br></br>
                <label>
                    Email Address *
                </label>
                <br></br>
                <input type="text" onChange={(e)=>setEmail(e.target.value)}>
                </input>
                <br></br>
                <label>
                    Password *
                </label>
                <br></br>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}>
                </input>
                <br></br>
                <br></br>
                <label>
                    Type *
                </label>
                <br></br>
                <select onClick={(e)=>setUserType(e.target.value)}>
                <option value="farmer">
                       
                    </option>
                    <option value="farmer">
                        Farmer
                    </option>
                    <option value="customer">
                        Customer
                    </option>
                    <option value="shopIncharge">
                        Shop Incharge
                    </option>
                </select>
                <br></br>
                <label>
                    Contact Number *
                </label>
                <br></br>
                <input type="text" onChange={(e)=>setContactNumber(e.target.value)}>
                </input>
                <br></br>
                <button className="b1" onClick={handleRegister}>Register</button>
            </div>
        </div>
      </div>
        </>
    )
}