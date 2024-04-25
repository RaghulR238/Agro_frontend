import "./nav.css";
import registerImg from "./images/registerImg2.jpg";
import cartIcon from "./images/cartIcon.png"
import {useNavigate} from "react-router-dom";
export default function Nav() {

  let retrievedValue=sessionStorage.getItem("userName");
  const navigate=useNavigate();

  return (
    <div className="landing">
      <div className="navBar">
        <div className="logo">
          <h1 style={{color:"#50a464"}}>Agro  Assistant</h1>
        </div>
        <div className="navCenter">
         <h1>Home </h1>
          <h1 onClick={()=>navigate("/shop")}>Shop</h1>

          <img onClick={()=>navigate("/cart")} src={cartIcon} style={{width:'20px',height:"20px",marginTop:"18px",borderRadius:'50%',padding:"15px",backgroundColor:"#cfe6ff"}}></img>
        </div>
      
        {
          retrievedValue?<h1 style={{color:"#50a464"}}>{retrievedValue}</h1>:<button className="register" onClick={()=>navigate("/")}>Register</button>
        }
          
      
      </div>
      <div className="image">
        <img className="registerImg" src={registerImg}></img>
      <div className="myAccount">
        <h1>My Account</h1>
        <span>Login/Sign Up</span>
        </div>
      </div>
    </div>
  );
}
