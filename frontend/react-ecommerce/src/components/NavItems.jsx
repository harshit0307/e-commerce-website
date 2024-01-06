import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/images/logo/logo.png"
import { useAuth } from '../contexts/AuthProvider'

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  const [socialToggle, setsocialToggle] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)

  const { authenticated, logout } = useAuth()

  // console.log(user)
  const handleLogout = () => {
    logout().then((result) => {
      alert("Logout Successfully !")
    }).catch((error) => {
      console.log(error)
    })
  }

  window.addEventListener("scroll", () => {
    if(window.scrollY > 200){
      setHeaderFixed(true)
    }else{
      setHeaderFixed(false)
    }
  })
  return (
    <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
      <div className={`header-top ${socialToggle ? "open" : ""}`}>
        <div className='container'>
            <div className='header-top-area d-md-none'>
              {
                authenticated ? (
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                ) :
                (
                  <div>
                    <Link to="/signup" className='lab-btn me-3'><span>Create Account</span></Link>
                    <Link to="/login">Log in</Link>
                  </div>
                )
              }
            </div>
        </div>
      </div>
      
      <div className='header-bottom'>
        <div className='container'>
          <div className='header-wrapper'>
            <div className='logo-search-acte'>
              <Link>
                <img src={logo} alt=""></img>
              </Link>
            </div>
            <div className='menu-area'>
              <div className='menu'>
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/cart-page">Cart</Link></li>
                </ul>
              </div>
              {
                authenticated ? (
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                ) :
                (
                  <div>
                    <Link to="/signup" className='lab-btn me-3'><span>Create Account</span></Link>
                    <Link to="/login">Log in</Link>
                  </div>
                )
              }
              <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : "" }`}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className='ellepsis-bar d-md-none' onClick={() => setsocialToggle(!socialToggle)}>
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavItems