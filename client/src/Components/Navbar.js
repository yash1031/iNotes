import React from "react"; 
import {
    Link, useLocation, useNavigate
} from "react-router-dom";
import {toast } from "react-toastify";

const Navbar = () => {
  const navigate= useNavigate();
  let location= useLocation();

  const handleSignOut= () =>{
    localStorage.removeItem('token');
    toast.success(`You're successfully Logged Out`);
    navigate('/login');
    handleNavItemClick();
  }

  const handleNavItemClick= () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-default navbar-inverse navbar-fixed-top"   style={{backgroundColor: "#9ba4b1", color: "white"}} >
      <div className="container-fluid">
        <Link className="navbar-brand" to={`/Home`} onClick={handleNavItemClick}>
          iNotes
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"  id="navbarSupportedContent" style={{ width:"50vw", textAlign:"center"}}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{right: "0", left: "auto"}}>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/Home"? "active": ""}`}aria-current="page" to="/Home" onClick={handleNavItemClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"? "active": "" }`} active to="/about" onClick={handleNavItemClick}>
                About
              </Link>
            </li>
          </ul>
          {!(localStorage.getItem('token'))?<form className="d-flex" role="search" style={{display: "flex", justifyContent:"center"}}>
            <Link className="nav-item btn mx-2 primaryBtn" to='/SignUp' role="button" onClick={handleNavItemClick}>SignUp</Link>
            <Link className="nav-item btn mx-2 primaryBtn" to='/LogIn' role="button" onClick={handleNavItemClick}>LogIn</Link>
          </form>:<button className="nav-item btn mx-2 primaryBtn" onClick={handleSignOut} role="button">SignOut</button>}
        </div>
      </div>
    </nav> 
    </>
  );
};

export default Navbar;
