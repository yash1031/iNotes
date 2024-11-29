import React, { useEffect, useContext } from "react";
import { 
  useNavigate, Link
} from "react-router-dom";
import { toast } from 'react-toastify';
import '../LoginSignUp.css'
import userContext from "../../../Contexts/User/userContext";

const LogIn = (props) => {
  const context = useContext(userContext);
  const {endPoint, setEndPoint}= context

  let navigate= useNavigate();
  useEffect(()=>{
    localStorage.setItem('currentEndpoint', 'LogIn');
    console.log("endPoint: ", endPoint);
    setEndPoint('LogIn');
    console.log("endPoint: ", endPoint);
  },[])

  const host= process.env.REACT_APP_HOST_NAME;
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    let email= document.getElementById('exampleInputEmail1').value;
    let password= document.getElementById('exampleInputPassword1').value;
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
            // save the authToken and redirect
            // console.log(`Success! Login Success for Email: ${email} `+ json.msg)
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
    
  };
  return (
    <div className="loginSignUpComponent">    

      <form className="loginSignUpForm" onSubmit={handleSubmit}>
        <h2>Log In To eNotes</h2>
        <div className="form-group my-3">
          <input type="email" className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-3">
          <input type="password" className="form-control input" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn primaryBtn" style={{width: "100%", padding: "5px auto"}}>
          Login
        </button>
      </form>

      <div className="signUpLoginSection">
        <Link to='/ForgotPwd'  id="forgotPassword" >Forgot Password?</Link>
        <Link to="/SignUp" id="signUpLogIn"  onTouchStart={(e)=>{document.getElementById('signUpLogIn').style.fontSize="35px"}}>Sign Up</Link>
      </div>
      
    </div>
  );
};

export default LogIn;
