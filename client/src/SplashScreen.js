import React from "react";
import screenLogo from "./Images/Logo.png";

const SplashScreen = () => {
  return (
   <>
   <div className="fa-bounce">
      <img src={screenLogo}  alt="App Logo" style={{ height:"16.5vh"}}/><span style={{background: "rgb(157 170 174 / 42%)", height: "30vh", fontSize: "106.5px", position: "relative", top: "40px", color: "#988876"}}>otes</span>
   </div>
   </> 
  );
};

export default SplashScreen;
