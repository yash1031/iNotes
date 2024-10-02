import React, { 
  useEffect, useState, useContext 
} from "react";
import { 
  useNavigate, Link
} from "react-router-dom";
import {toast } from 'react-toastify';
import userContext from "../../../Contexts/User/userContext";
import Email from "./Email";
import Passwords from "./Passwords";
import '../LoginSignUp.css'

const host = process.env.REACT_APP_HOST_NAME;

const SignUp = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("currentEndpoint", "SignUp");
  }, []);
  const [emailValidated, setEmailValidated] = useState(null);
  const context= useContext(userContext);
  const {createUser}= context;

  const handleSubmit = async (e) => {
    e.preventDefault(); //This will prevent the page to reload
    let name = document.getElementById("nameID").value;
    let email = document.getElementById("emailIDSignUp").value;
    let password = document.getElementById("passwordID").value;
    let cpassword = document.getElementById("cpasswordID").value;
    let isMissing= false;


    if(name==''){
        const element= document.getElementById("userNameRequired");
        element.style.display= '';
        setTimeout(()=>{
           element.style.display= 'none';
        }, 2000);
        isMissing= true;
    }
    if(email==''){
        const element= document.getElementById("emailRequired");
        element.style.display= '';
        setTimeout(()=>{
           element.style.display= 'none';
        }, 2000);
        isMissing= true;

    }
    else if (emailValidated !== email) {
      const element= document.getElementById("validationRequired");
      element.style.display= '';
      setTimeout(()=>{
         element.style.display= 'none';
      }, 2000);
      isMissing= true;
    }
    if(password=== ''){
      const element= document.getElementById("passwordRequired");
      element.style.display= '';
      setTimeout(()=>{
         element.style.display= 'none';
      }, 2000);
      isMissing= true;

    }
    if(cpassword===''){
      const element= document.getElementById("cpasswordRequired");
      element.style.display= '';
      setTimeout(()=>{
         element.style.display= 'none';
      }, 2000);
      isMissing= true;

    }
    if(isMissing) return;

    if (password !== cpassword) {
      document.getElementById("passwordsNotMatching").style.display = "block";
      return;
    }
    const userCreated= await createUser(name, email, password);
    if(userCreated[0]){
      localStorage.setItem("token", userCreated[1]);
      toast.success("Account Created Successfully");
      navigate("/Home");

    }
    else{
      if(typeof userCreated[1]=== "string")
        toast.error(userCreated[1])
      else
        toast.error("Unexpected error in User Creation")

    }
    
  };

  return (
   
      
    <div className="loginSignUpComponent">
      

      <form className="loginSignUpForm" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <Email setEmailValidated={setEmailValidated} />
        <div className="form-group my-3">
          <input type="text" className="form-control input" id="nameID" aria-describedby="emailHelp" placeholder="User Name" />
          <div id="userNameRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>

        <Passwords/>
       
        <button type="submit" className="btn primaryBtn" style={{ marginTop: "15px", width: "100% "}} >
          Sign Up
        </button>
      </form>

      <div className="signUpLoginSection" style={{textAlign: "center", color: "lightgrey"}}> 
        Have an account? <Link to="/LogIn" id="logInsignUp" style={{textDecoration: "none", color: "white"}} onTouchStart={(e)=>{document.getElementById('logInsignUp').style.fontSize="35px"}}>Log In</Link>
      </div>

    </div>
  );
};

export default SignUp;
