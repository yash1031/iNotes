import React from "react";
import {
    Link, useLocation,
  } from "react-router-dom";
import { useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import FilterNotes from "../Display Notes/FilterNotes";
import SortNotes from "../Display Notes/SortNotes";

const Navbar = () => {
  const navigate= useNavigate();
  let location= useLocation();
  useEffect(()=>{
    console.log(location);
  },[location]);

  const handleSignOut= () =>{
    localStorage.removeItem('token');
    toast.success(`You're successfully Logged Out`);
    navigate('/login');
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-default navbar-inverse navbar-fixed-top"   style={{backgroundColor: "#9ba4b1", color: "white"}} >
      <div className="container-fluid">
        <Link className="navbar-brand" to={`/Home`}>
          iNotes
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/Home"? "active": ""}`}aria-current="page" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"? "active": "" }`} active to="/about">
                About
              </Link>
            </li>
          </ul>
          {/* <span style={{display: ""}}> */}

          <FilterNotes />
          <SortNotes/>
          {/* </span> */}
          {!(localStorage.getItem('token'))?<form className="d-flex" role="search">
            <Link className="btn mx-2 primaryBtn" to='/SignUp' role="button">SignUp</Link>
            <Link className="btn mx-2 primaryBtn" to='/LogIn' role="button">LogIn</Link>
          </form>:<button className="btn mx-2 primaryBtn" onClick={handleSignOut} role="button">SignOut</button>}
        </div>
      </div>
    </nav> 
    </>
  );
};

export default Navbar;
