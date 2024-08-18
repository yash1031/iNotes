// import './App.css';
import Navbar from './Components/Navbar';
import NoteState from './Contexts/Notes/noteState';
import {
      Outlet
} from "react-router-dom"
import Header from './Components/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading]= useState(true);
  const navigate= useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('currentEndpoint')== null)
      navigate('LogIn');
    else 
      navigate(localStorage.getItem('currentEndpoint'))
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    // document.body.style.alignItems = '';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    document.body.style.backgroundColor= '#474f57';
    setTimeout(()=>{
      setLoading(false);
      document.body.style.display = '';
      document.body.style.justifyContent = '';
      // document.body.style.alignItems = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.backgroundColor= '';
    },2000);  
  },[])
  return (
    <>
      {loading ? <SplashScreen />  :    <NoteState><Header/><Outlet/></NoteState>}
    </>
  );

}

 

export default App;