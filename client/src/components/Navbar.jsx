import React from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <>
    <div className='navbar'>
      <div className='logo'>
        <h2 className='text-2xl '>MindEase</h2>
      </div>
      <div className='links'>
          <li>Dashboard</li>
          <li>Profile</li>
      </div>
    </div>
    <hr/>
    </>
  )
}

export default Navbar
