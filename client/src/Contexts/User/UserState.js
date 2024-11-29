import React from 'react'
import userContext from './userContext'
import { useState } from 'react';

const UserState = (props) => {

  const host= process.env.REACT_APP_HOST_NAME;
  const [endPoint, setEndPoint]= useState('LogIn')

  const requestOtp= async (email)=>{
    try{
      const response = await fetch(`${host}/api/auth/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      if(response.status=== 200) return [true, json.msg]
      else return [false, json.msg];
    }
    catch(error){
      return [false, error];
    }
  }

  const deleteOtp= async (email)=>{
    try{
      const response = await fetch( `${host}/api/auth/delete-otp`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      if(response.status=== 200) return [true, json.msg]
      else return [false, json.msg];
    }
    catch(error){
      return [false, error];
    }
  }

  const verifyOtp= async (email, otp)=>{
    try{
      const response = await fetch(`${host}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      if(response.status=== 200) return [true, json.msg]
      else return [false, json.msg];
    }
    catch(error){
      return [false, error];
    }
  }

  const createUser= async (name, email, password)=>{
        try{
              const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
              });
              const json = await response.json();
              if (response.status === 200) {
                // console.log("Success! Authentication Token is: "+ json.msg);
                // save the authToken and redirect
                return [true, json.msg];
              } else {
                console.log("Error: "+ JSON.stringify(json.msg));
                return [false, json.msg];
              }
        }catch(error){
              return [false, error];
        }
  }

  const loginUser= async (email, password)=>{
  }

  const updatePassword= async (email, password)=>{
        try{
            const response= await fetch(`${host}/api/auth/update-password`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            const json= response.json();
            if(response.status=== 200){
                return true;
            }
            else{
               return false;
            }
        }catch(error){
            return false;
        }
  }

  return (
    <userContext.Provider value={{endPoint, setEndPoint, updatePassword, loginUser, createUser, verifyOtp, deleteOtp, requestOtp}}>
      {props.children}
    </userContext.Provider>
  )
}

export default UserState
