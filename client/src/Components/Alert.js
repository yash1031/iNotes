import React from 'react'
import { ToastContainer } from 'react-toastify';

export default function Alert (props) {
  return (
      <ToastContainer
          position="top-left"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="gray"
          style={{top:"50px", left:"0"}}
      />
  )
}
