import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
   Email, Passwords 
} from './SignUp'
import './ForgotPwd.css'

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
        const element= document.getElementById("validationRequired");
        element.style.display= '';
        setTimeout(()=>{
            element.style.display= 'none';
        }, 2000);
        isMissing= true;
    }
    if(isMissing) return;
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
            document.getElementById('newPasswords').style.display= "none";
            document.getElementById('passwordChanged').style.display= "";
            document.getElementById('passwordRestLabel').style.display= "none";
            document.getElementById('successIcon').classList.add('fa-beat');
            setTimeout(()=>{
                document.getElementById('successIcon').classList.remove('fa-beat');
            },3000);
        }
        else{
          toast.error("Error in Password Updation");
        }
    }catch(error){
        toast.error("Error in Password Updation");
    }
  }

  return (
    <div className="loginSignUpComponent">
      <div className="forgotPwdContent">
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
    </div>
  )
}

export default ForgotPwd
