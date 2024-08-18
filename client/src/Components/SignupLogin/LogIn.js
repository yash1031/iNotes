import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

const LogIn = (props) => {

  let navigate= useNavigate();
  useEffect(()=>{
    localStorage.setItem('currentEndpoint', 'LogIn');
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
            console.log(`Success! Login Success for Email: ${email} `+ json.msg)
            localStorage.setItem('token', json.msg);
            toast.success("You're successfully logged in");
            navigate('/Home');
          }
          else{
            console.log("Failure! Error in LogIn"+ json.msg)
            toast.error("Pls enter the valid credentials");
          }
    }catch(error){
      console.log("Failure! Error in Log In"+ error.message);
      toast.error("Error in Logging In!");
    }
    
  };
  return (
    <div className="container " style={{height: "100%", padding: "90px 30px", margin: "auto", marginTop: "100px", width:"30%", backgroundColor: "rgb(199 213 234 / 19%)", borderRadius: "5px", boxShadow: "0 2px 10px rgba(184, 183, 183, 0.1)"}}>
      
      <h2>Log In To iNotes</h2>

      <form onSubmit={handleSubmit}>
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

      <div id="forgotPasswordsignUplogIn" style={{margin:"30px auto"}}>
        <Link to='/ForgotPwd'  id="forgotPassword" style={{float:"left", textDecoration: "none", color:"lightgrey"}}>Forgot Password?</Link>
        <Link to="/SignUp" id="signUplogIn" style={{textDecoration: "none", color: "white", float: "right"}} onTouchStart={(e)=>{document.getElementById('signUplogIn').style.fontSize="35px"}}>Sign Up</Link>
      </div>
      
    </div>
  );
};

export default LogIn;
