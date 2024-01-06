import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthProvider"

const title = "Register"
const socialTitle  = "Signup with Social Media"
const btnText = "Signup Now"

const socialList = [
    {
        iconName: 'icofont-facebook',
        siteLink: '#',
        className: 'facebook',
    },
    {
        iconName: 'icofont-twitter',
        siteLink: '#',
        className: 'twitter',
    },
    {
        iconName: 'icofont-linkedin',
        siteLink: '#',
        className: 'linkedin',
    },
    {
        iconName: 'icofont-instagram',
        siteLink: '#',
        className: 'instagram',
    },
    {
        iconName: 'icofont-pinterest',
        siteLink: '#',
        className: 'pinterest',
    },
]

const Signup = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const { signup } = useAuth()

    const from = location.state?.from?.pathname || "/"

    // const handleRegister = () => {

    // }

    const handleSignup = (e) => {
        e.preventDefault()
        const form = e.target
        const username = form.name.value
        const email = form.email.value
        const password = form.password.value
        const confirmPassword = form.confirmpassword.value
        
        if(password !== confirmPassword){
            setErrorMessage("Password doesn't match Please a correct password!")
        }else{
            setErrorMessage("")
            signup(username, email, password).then((result) => {
                alert("Account created successfully !")
                navigate(from, {replace: true})
            }).catch((error) => {
                alert(`${error.message}`)
            })
        }
    }


  return (
    <div>
        <div className='login-section padding-tb section-bg'>
            <div className='container'>
                <div className='account-wrapper'>
                    <h3 className='title'>{title}</h3>
                    <form className='account-form' onSubmit={handleSignup}>
                        <div className='form-group'>
                            <input type="text" name='name' id='name' placeholder='Full Name *' required />
                        </div>
                        <div className='form-group'>
                            <input type="email" name='email' id='email' placeholder='Email Address *' required />
                        </div>
                        <div className='form-group'>
                            <input type="password" name='password' id='password' placeholder='Password *' required />
                        </div>
                        <div className='form-group'>
                            <input type="password" name='confirmpassword' id='confirmpassword' placeholder='Confirm Password *' required />
                        </div>

                        <div>
                            {
                                errorMessage && (
                                    <div className='error-message text-danger mb-1'>{errorMessage}</div>
                                )
                            }
                        </div>

                        <div className='form-group'>
                            <button type='submit' className='d-block lab-btn'>
                                <span>{btnText}</span>
                            </button>
                        </div>
                    </form>

                    <div className='account-bottom'>
                        <span className='d-block cate pt-10'>
                            Have an Account? <Link to="/login">Login</Link>
                        </span>
                        <span className='or'>
                            <span>or</span>
                        </span>

                        <h5 className='subtitle'>{socialTitle}</h5>
                        <ul className='lab-ul social-icons justify-content-center'>
                            <li>
                                <button className='github'><i className='icofont-github'></i></button>
                            </li>
                            {
                                socialList.map((val, i) => (
                                    <li key={i}>
                                        <a href={val.siteLink} className={val.className}><i className={val.iconName}></i></a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup