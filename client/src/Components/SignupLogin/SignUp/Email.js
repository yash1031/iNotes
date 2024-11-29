import React, {useState, useContext} from 'react'
import {toast } from 'react-toastify';
import userContext from '../../../Contexts/User/userContext';


const host = process.env.REACT_APP_HOST_NAME;

const Email= ({setEmailValidated})=>{
    const [otpExpiryTimeout, setOtpExpiryTimeout] = useState(null);
    const [isButtonDisabled, setIsbuttonDisabled] = useState(true);
    const context= useContext(userContext);
    const {requestOtp, verifyOtp, deleteOtp}= context;

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
            const requestedOtp= await requestOtp(email);
            if (requestedOtp[0]) {
                // console.log("Success in requesting OTP: "+ requestedOtp[1])
                //If it's not the first time Validation button is clicked, time to Expire OTP will move forward, need to cancel execution of previous setTimeout function
                if (otpExpiryTimeout !== null) {
                  clearTimeout(otpExpiryTimeout);
                }
                setOtpExpiryTimeout(
                    setTimeout(async (e) => {
                        if (document.getElementById("otpSection")?.style.display === "") {
                          document.getElementById("otpSection").style.display = "none";
                          setIsbuttonDisabled(false);
                          toast.info("OTP Expired.");
                          // Once OTPs are expired, all OTP records for that user to be deleted from DB
                          const deletedOtp= await deleteOtp(email);
                          if(deletedOtp[0]){
                              // console.log("Result for record deletion: " + deletedOtp[1]);
                          }
                          else{
                              // console.log("Error in deletion is: " + deletedOtp[1]);
                          }
                        }
                    }, 120000)
                );
            } else {
                // console.log("Error in requesting OTP: "+ requestedOtp[1]);
                toast.error("OTP not sent. Pls try again");
            }
    }
  
    const verifyOTP= async (e) => {
        let email = document.getElementById("emailIDSignUp").value;
        let otp = document.getElementById("otpID").value;
        const verifiedOtp= await verifyOtp(email, otp);
        console.log(verifiedOtp);
        if (verifiedOtp[0]) {
            // console.log("Success! Result for email verification: "+ verifiedOtp[1]);
            document.getElementById("otpSection").style.display =
                "none";
            document.getElementById("verified").style.display = "";
            setTimeout(() => {
                if(document.getElementById("verified")) document.getElementById("verified").style.display = "none";
            }, 3000);
            setEmailValidated(email);
            //Enable the validate button
            setIsbuttonDisabled(false);

            // Once OTP is verified, all OTP records for that user to be deleted from DB
            const deletedOtp= await deleteOtp(email);
            if(deletedOtp[0]){
                // console.log("Result for record deletion: " + deletedOtp[1]);
            }
            else{
                // console.log("Error in deletion is: " + deletedOtp[1]);
            }   
        } else {
            // console.log("Error in email Verification: "+ verifiedOtp[1])
            toast.error("OTP is incorrect");
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
  
            <div id="otpSection" style={{ display: "none", margin: "10px 0" }}>
              <div className="input-group" style={{  }}>
                <input type="number" className="form-control input" id="otpID" placeholder="Enter OTP" style={{ marginRight: "10px", WebkitAppearance: 'none', MozAppearance: 'textfield'}}/>
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

export default Email
