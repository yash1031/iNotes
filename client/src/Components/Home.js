import React from "react";
import Notes from "./Notes";
import { useEffect } from "react";

const Home = () => {
  useEffect(()=>{
    localStorage.setItem('currentEndpoint', 'Home');
  },[])
  return (
    <div className="container" style={{width: "75%"}}>
      <Notes/>
    </div>
  );
};

export default Home;
