import React from 'react'

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

export default Passwords
