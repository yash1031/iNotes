import React from 'react'
import Navbar from './Navbar'
import Alert from './Alert'
import { useContext } from 'react'

const Header = () => {

  return (
    
    <div style={{marginBottom: "25px", position: "fixed", top: "0", left: "0", width: "100%", zIndex: "2"}}>
      <Navbar></Navbar>
      <Alert></Alert>
    </div>
  )
}

export default Header
