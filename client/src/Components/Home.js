import React from "react";
import Notes from "./Notes";
import { useEffect } from "react";
import FilterNotes from "../Display Notes/FilterNotes";
import './Home.css'

const Home = () => {
  useEffect(()=>{
    localStorage.setItem('currentEndpoint', 'Home');
  },[])
  return (
    <div id="homeComponent" className="container" style={{width: "75%"}}>
      <div className="" style={{position: "absolute",  top:"90px", width: "73%"}}>
        <FilterNotes />
        {/* <div style={{float: "right"}}> */}
          
        {/* </div> */}
      </div>
      <Notes/>
    </div>
  );
};

export default Home;
