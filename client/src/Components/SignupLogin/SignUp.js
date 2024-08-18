import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import {toast } from 'react-toastify';
// import GoogleLogin from "./GoogleLogin";
// import GoogleOAuth from "./GoogleOAuth";
// import GoogleLogout from "./GoogleLogout";

const host = process.env.REACT_APP_HOST_NAME;

const Email= ({email, setEmailValidated})=>{
  const [otpExpiryTimeout, setOtpExpiryTimeout] = useState(null);
  const [isButtonDisabled, setIsbuttonDisabled] = useState(true);

  const inputEmail= (e) => {
    e.preventDefault();
    let currEmail = e.target.value;
    const regex = /^.{5,}@gmail\.com$/;
    // Test the email against the regex
    if (regex.test(currEmail)) {
      setIsbuttonDisabled(false);
    } else {
      setIsbuttonDisabled(true);
      document.getElementById("otpSection").style.display = "none";
    }
  }

  const validateEmail= async (e) => {
    e.preventDefault();
    document.getElementById("otpSection").style.display = "";
    document.getElementById("otpID").value = "";
    setIsbuttonDisabled(true);
    let email = document.getElementById("emailIDSignUp").value;
    try{
        const response = await fetch(`${host}/api/auth/request-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        if (response.status === 200) {
          console.log("Success in requesting OTP: "+ json.msg)
          //If it's not the first time Validation button is clicked, time to Expire OTP will move forward, need to cancel execution of previous setTimeout function
          if (otpExpiryTimeout !== null) {
            clearTimeout(otpExpiryTimeout);
          }

          setOtpExpiryTimeout(
            setTimeout(async (e) => {
              if (document.getElementById("otpSection").style.display === "") {
                document.getElementById("otpSection").style.display = "none";
                setIsbuttonDisabled(false);
                toast.info("OTP Expired.");
                // Once OTPs are expired, all OTP records for that user to be deleted from DB
                try{
                    const response = await fetch( `${host}/api/auth/delete-otp`,{
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email }), // body data type must match "Content-Type" header
                      }
                    );
                    const json = await response.json();
                    console.log("Result for record deletion: " + json.msg);
                }catch(error){
                  console.log("Error in deletion is: " + json.msg);
                }
              }
            }, 120000)
          );
        } else {
          console.log("Error in requesting OTP: "+ json.msg);
          toast.error("OTP not sent. Pls try again");
        }
    }catch(error){
      console.log("Error in requesting OTP: "+ error);
      toast.error("OTP not sent. Pls try again");
    }
  }

  const verifyOTP= async (e) => {
    let email = document.getElementById("emailIDSignUp").value;
    let otp = document.getElementById("otpID").value;
    try{
      const response = await fetch(`${host}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      if (response.status === 200) {
        //Enable the validate button
        setIsbuttonDisabled(false);
        // Once OTP is verified, all OTP records for that user to be deleted from DB
        try{
          const response = await fetch( `${host}/api/auth/delete-otp`,{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }), // body data type must match "Content-Type" header
            }
          );
          const json = await response.json();
          console.log("Result for record deletion: "+ json.msg)
        }catch(error){
          console.log("Error in Record Deletion"+ error.msg);
        }
        console.log("Success! Result for email verification: "+ json.msg)
        document.getElementById("otpSection").style.display =
          "none";
        document.getElementById("verified").style.display = "";
        setTimeout(() => {
          document.getElementById("verified").style.display =
            "none";
        }, 3000);
        setEmailValidated(email);
      } else {
          console.log("Error in email Verification: "+ json.msg)
          toast.error("OTP is incorrect");
      }
    }catch(error){
      console.log("Error in email Verification: "+ error.msg);
      toast.error("Error in Verification.")
    }
  }

  return (
    <div className="form-group my-3 ">

          <div className="input-group">
            <input type="email" className="form-control input" id="emailIDSignUp" aria-describedby="emailHelp" placeholder="E-mail address" style={{ marginRight: "10px" }} onChange={inputEmail}/>
            <button type="button" className="btn btn-secondary secondaryBtn" id="emailValidation1" disabled={isButtonDisabled} onClick={validateEmail}>
              Validate
            </button>
          </div>

          <div id="otpSection" style={{ display: "none" }}>
            <div className="input-group" style={{ width: "60%", margin: "10px 0" }}>
              <input type="number" className="form-control input" id="otpID" placeholder="Please enter the OTP" style={{ marginRight: "10px", WebkitAppearance: 'none', MozAppearance: 'textfield'}}/>
              <button type="button" className="btn btn-secondary secondaryBtn" aria-disabled="true" onClick={verifyOTP} >
                Verify
              </button>
            </div>
            <small id="otpHelpID" className="form-text text-muted">
              OTP Sent!. It is valid for 5 mins.
            </small>
          </div>

          <div id="verified" style={{ color: "#055d07", display: "none", marginTop: "10px" }}>
            Verified Successully!{" "}
            <i className="fa-regular fa-circle-check fa-beat" style={{ color: "#444f40;" }} />
          </div>

          <div id="emailRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
          <div id="validationRequired" style={{display:"none", color:"Red"}}>
            Email Validation Required*
          </div>
    </div>
  )
}

const Passwords= ()=>{

  const handlePwdOnBlur = (e, showHideElementID) => {
    e.preventDefault();
    let password = document.getElementById("passwordID").value;
    let cpassword = document.getElementById("cpasswordID").value;
    if (cpassword !== "" && password !== "" && password !== cpassword) {
      document.getElementById("passwordsNotMatching").style.display = "block";
    }
    if (password === "") {
      document.getElementById("openedEyeIcon").style.display = "inline";
      document.getElementById("closedEyeIcon").style.display = "none";
    }
    if (cpassword === "") {
      document.getElementById("copenedEyeIcon").style.display = "inline";
      document.getElementById("cclosedEyeIcon").style.display = "none";
    }
    document.getElementById(showHideElementID).style.boxShadow = "";
  };

  const handlePwdOnFocus = (e, showHideElementID) => {
    e.preventDefault();
    document.getElementById("passwordsNotMatching").style.display = "none";
    document.getElementById(showHideElementID).style.boxShadow =
      "0 0 5px rgba(0, 123, 255, 0.5)";
  };

  const handleShowHidePwd = (e, passwordFieldID, openEyeID, closedEyeID) => {
    e.preventDefault();
    if (document.getElementById(passwordFieldID).value === "") return;
    let passwordType = document.getElementById(passwordFieldID).type;
    if (passwordType === "password") {
      document.getElementById(passwordFieldID).type = "";
      document.getElementById(openEyeID).style.display = "none";
      document.getElementById(closedEyeID).style.display = "inline";
    } else {
      document.getElementById(passwordFieldID).type = "password";
      document.getElementById(openEyeID).style.display = "inline";
      document.getElementById(closedEyeID).style.display = "none";
    }
  };

   return (
    <div id="passwords">
    <div className="form-group my-3">
      <div className="input-group" id="show_hide_password" onFocus={(e) => handlePwdOnFocus(e, "show_hide_password")} onBlur={(e) => handlePwdOnBlur(e, "show_hide_password")}
        style={{ border: "1px solid #00000021", borderRadius: "5px", paddingRight: "5px", background: "white",}}>
        <input type="password" className="form-control input" id="passwordID" placeholder="Password" style={{ border: "none", boxShadow: "none" }}/>
        <button style={{ background: "white", border: "none" }} onClick={(e) =>handleShowHidePwd(e,"passwordID","openedEyeIcon","closedEyeIcon")}>
          <i className="fa-regular fa-eye" id="openedEyeIcon" style={{ border: "none", display: "inline" }}/>
          <i className="fa-regular fa-eye-slash" id="closedEyeIcon" style={{ border: "none", display: "none" }} />
        </button>
      </div>
      <div id="passwordRequired" style={{display:"none", color:"Red"}}>
        Required*
      </div>
    </div>

    <div className="form-group my-3">
      <div className="input-group" id="cshow_hide_password" onFocus={(e) => handlePwdOnFocus(e, "cshow_hide_password")} onBlur={(e) => handlePwdOnBlur(e, "cshow_hide_password")}
        style={{ border: "1px solid #00000021", borderRadius: "5px", paddingRight: "5px", background: "white",}}>
        <input type="password" className="form-control input" id="cpasswordID" placeholder="Confirm Password"  style={{ border: "none", boxShadow: "none" }} />
        <button style={{ background: "white", border: "none" }} onClick={(e) =>handleShowHidePwd(e,"cpasswordID","copenedEyeIcon","cclosedEyeIcon")}>
          <i className="fa-regular fa-eye" id="copenedEyeIcon" style={{ border: "none", display: "inline" }}/>
          <i className="fa-regular fa-eye-slash" id="cclosedEyeIcon" style={{ border: "none", display: "none" }} />
        </button>
      </div>
      <div id="cpasswordRequired" style={{display:"none", color:"Red"}}>
        Required*
      </div>
    </div>

    <div id="passwordsNotMatching" style={{ display: "none", color: "red", margin: "10px 0" }} >
      The Passwords you entered does not match.
    </div>
  </div>
   );
}

const SignUp = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("currentEndpoint", "SignUp");
  }, []);
  const [emailValidated, setEmailValidated] = useState(null);

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
    try{
          const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
          });
          const json = await response.json();
          if (response.status === 200) {
            console.log("Success! Authentication Token is: "+ json.msg);
            // save the authToken and redirect
            localStorage.setItem("token", json.msg);
            toast.success("Account Created Successfully");
            navigate("/Home");
          } else {
            console.log("Error: "+ json.msg);
            toast.error(json.msg)
          }
    }catch(error){
          console.log("Error: "+ error);
          toast.error(error)
    }
  };

  // const [user, setUser] = useState(null);

  // const handleLoginSuccess = (userData) => {
  //   console.log('Login Success:', userData);
  //   setUser(userData);
  // };

  // const handleLoginFailure = (error) => {
  //   console.log('Login Failed:', error);
  // };

  // const handleLogout = () => {
  //   setUser(null);
  // };

  return (
   
      
    <div className="container" style={{ height: "100%", padding: "70px 30px", margin: "auto", marginTop: "100px", width: "30%", background: "rgb(199 213 234 / 19%)", borderRadius: "5px", boxShadow: "0 2px 10px rgba(184, 183, 183, 0.1)"}}>
      
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <Email emailValidated={emailValidated} setEmailValidated={setEmailValidated} />
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

      <div style={{textAlign: "center", marginTop:"30px", color: "lightgrey"}}> 
        Have an account? <Link to="/LogIn" id="logInsignUp" style={{textDecoration: "none", color: "white"}} onTouchStart={(e)=>{document.getElementById('logInsignUp').style.fontSize="35px"}}>Log In</Link>
      </div>

      {/* <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); console.log("User is: "+ user)}}>Check User</button> */}

      {/* <div>
        <h1>Google Sign-In</h1>
        <GoogleLogin onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
        <GoogleOAuth onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
      </div> */}

      {/* <div>
        <h1>Google Sign-In with Google Identity Services</h1>
        {user ? (
          <GoogleLogin onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} /> 
         ) : ( 
           <div> 
             <h2>Welcome, {user.name}</h2> 
             <img src={user.imageUrl} alt={user.name} />
             <GoogleLogout onLogout={handleLogout} />
           </div>
         )} 

      </div> */}

    </div>
  );
};

export {Email, Passwords};
export default SignUp;
