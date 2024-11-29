import React, { useEffect, useContext } from "react";
import Notes from "./Notes";
import FilterNotes from "../Display Notes/FilterNotes";
import userContext from "../Contexts/User/userContext";
import './Home.css'

const Home = () => {
  
  const context = useContext(userContext);
  const {setEndPoint}= context
  useEffect(()=>{
    localStorage.setItem('currentEndpoint', 'Home');
    setEndPoint('Home');
  },[])
  return (
    <div id="homeComponent" className="container" style={{width: "75%"}}>
      <div className="" style={{position: "absolute",  top:"90px", width: "73%"}}>
        <FilterNotes />
      </div>
      <Notes/>
    </div>
  );
};

export default Home;
