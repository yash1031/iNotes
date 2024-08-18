import React from 'react'
import { Email } from './SignUp'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Passwords } from './SignUp';
import { toast } from 'react-toastify';

const ForgotPwd = () => {
  const [emailValidated, setEmailValidated] = useState(null);
  const host= process.env.REACT_APP_HOST_NAME;
  let navigate= useNavigate();

  const handleSubmit= (e)=>{
    e.preventDefault();
    let email = document.getElementById("emailIDSignUp").value;
    let isMissing= false;

    if(email==''){
        const element= document.getElementById("emailRequired");
        element.style.display= '';
        setTimeout(()=>{
           element.style.display= 'none';
        }, 2000);
        isMissing= true;

    }
    else if (emailValidated !== email) {
        console.log("Validated email is: "+ emailValidated);
        const element= document.getElementById("validationRequired");
        element.style.display= '';
        setTimeout(()=>{
            element.style.display= 'none';
        }, 2000);
        isMissing= true;
    }
    if(isMissing) return;
    console.log("email Validated")
    document.getElementById('emailValidation').style.display= "none"
    document.getElementById('newPasswords').style.display= "";  
  }

  const handleReset= async (e)=> {
    e.preventDefault();
    let email = document.getElementById("emailIDSignUp").value;
    let password = document.getElementById("passwordID").value;
    let cpassword = document.getElementById("cpasswordID").value;
    if (password !== cpassword) {
        document.getElementById("passwordsNotMatching").style.display = "block";
        return;
    }
    try{
        const response= await fetch(`${host}/api/auth/update-password`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });
        const json= response.json();
        if(response.status=== 200){
            console.log("Success! Password updated for: "+ json.msg);
            document.getElementById('newPasswords').style.display= "none";
            document.getElementById('passwordChanged').style.display= "";
            document.getElementById('passwordRestLabel').style.display= "none";
            document.getElementById('successIcon').classList.add('fa-beat');
            setTimeout(()=>{
                document.getElementById('successIcon').classList.remove('fa-beat');
            },3000);
        }
        else{
          console.log("Failure! Issue in password updation: "+ json.msg);
          toast.error("Error in Password Updation");
        }
    }catch(error){
        console.log("Error in Updating Password: "+ error.msg);
        toast.error("Error in Password Updation");
    }
  }

  return (
    <div className="container " style={{height: "100%", padding: "90px 30px", margin: "auto", marginTop: "100px", width:"25%", backgroundColor: "rgb(199 213 234 / 19%)", borderRadius: "5px", boxShadow: "0 2px 10px rgba(184, 183, 183, 0.1)"}}>
      <label id="passwordRestLabel"><h2>Password Reset</h2></label>
      <div id="emailValidation" style={{display:""}}>
        <div id="info" style={{border: "1px solid white", borderRadius: "7px", background: "gray", margin: "20px auto", padding:"10px"}}>
        Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.
        </div>
        <form onSubmit={handleSubmit}>
            <Email emailValidated={emailValidated} setEmailValidated={setEmailValidated} />
            <button type="submit" className="btn primaryBtn" style={{width: "100%", marginTop: "30px"}}>
            Submit
            </button>
        </form>
      </div>
      <div id="newPasswords" style={{display:"none"}}>
        <form onSubmit={handleReset}>
            <Passwords></Passwords>
                <button type="submit" className="btn primaryBtn" style={{width: "100%", marginTop: "30px"}}>
                Reset My Password
                </button>
            </form>
      </div>
      <div id="passwordChanged" style={{display: "none"}}>
        <i id="successIcon" class="fa-regular fa-circle-check fa-9x" style={{display:"block", textAlign: "center", marginBottom:"50px"}}/>
        <h2 style={{textAlign: "center", marginBottom: "30px"}}>Password Changed!</h2>
        <p>Your Password has been changed successfully.</p>
        <button className="btn primaryBtn" style={{width: "100%", marginTop: "30px"}} onClick={(e)=>{navigate('/LogIn')}}>
                Go Back to Log In
         </button>
      </div>
    </div>
  )
}

export default ForgotPwd
