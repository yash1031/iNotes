import React, {useContext} from 'react'
import { toast } from 'react-toastify';
import { 
  useNavigate, Link
} from "react-router-dom";
import './Demonstration.css'
import userContext from '../Contexts/User/userContext';

const Demonstration = () => {
  const context = useContext(userContext);
  const {endPoint}= context
  
  let navigate= useNavigate();
  const loginToJohnCreds= async (e)=>{
    e.preventDefault();

    const host= process.env.REACT_APP_HOST_NAME;
    let email= process.env.REACT_APP_DEMONSTRATION_EMAIL;
    let password= process.env.REACT_APP_DEMONSTRATION_PASSWORD;
    console.log(email)
    console.log(password)
    try{
          const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}), 
          });   
          const json= await response.json();
          if(response.status=== 200){
            localStorage.setItem('token', json.msg);
            toast.success("You're successfully logged in");
            navigate('/Home');
          }
          else{
            // console.log("Failure! Error in LogIn"+ json.msg)
            toast.error("Pls enter the valid credentials");
          }
    }catch(error){
      // console.log("Failure! Error in Log In"+ error.message);
      toast.error("Error in Logging In!");
    }
  }

  return (
    endPoint==='LogIn' || endPoint==='SignUp'? <div style={{ fontSize: "18px", width: "40%", margin: "40px auto"}}>
      For demonstration, please login with John@gmail.com/John@123 or <a id="clickHereBtn" onClick={e=> loginToJohnCreds(e)} style={{ textDecoration: "underline", color: "#a3a3de", fontStyle: "italic"}}>Click Here</a>
    </div>: ''
  )
}

export default Demonstration
