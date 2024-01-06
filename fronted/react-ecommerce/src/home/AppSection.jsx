import React from 'react'
import { Link } from 'react-router-dom'

const btnText = "Sign up for Free"
const title = "Style Anytime, Anywhere"
const desc = "We give you Style that no where Found" 
const AppSection = () => {
  return (
    <div className='app-section padding-tb'>
        <div className='container'>
            <div className='section-header text-center'>
                <Link to="/sign-up" className="lab-btn mb-4">{btnText}</Link>
                <h2 className='title'>{title}</h2>
                <p>{desc}</p>
            </div>
        </div>
        
    </div>
  )
}

export default AppSection