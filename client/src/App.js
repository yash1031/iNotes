import React,  { useEffect, useState } from 'react';
import {
   Outlet, useNavigate 
} from 'react-router-dom';
import NoteState from './Contexts/Notes/NoteState';
import Header from './Components/Header';
import SplashScreen from './SplashScreen';
import UserState from './Contexts/User/UserState';
import "react-toastify/dist/ReactToastify.css";

function App() {
  //CHeck if its there
  const [loading, setLoading]= useState(true);
  const navigate= useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('currentEndpoint')== null)
      navigate('LogIn');
    else 
      navigate(localStorage.getItem('currentEndpoint'))
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    document.body.style.backgroundColor= '#474f57';
    setTimeout(()=>{
      setLoading(false);
      document.body.style.display = '';
      document.body.style.justifyContent = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.backgroundColor= '';
    },2000);  
  },[])
  return (
    <>
      {loading ? <SplashScreen />  :    <UserState><NoteState><Header/><Outlet/></NoteState></UserState>}
    </>
  );

}

 

export default App;