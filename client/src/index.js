import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter, RouterProvider 
} from "react-router-dom"
import App from './App';
import Home from './Components/Home';
import About from './Components/About';
import LogIn from './Components/SignupLogin/LogIn';
import SignUp from './Components/SignupLogin/SignUp';
import ForgotPwd from './Components/SignupLogin/ForgotPwd';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/LogIn",
        element: <LogIn />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/ForgotPwd",
        element: <ForgotPwd />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();