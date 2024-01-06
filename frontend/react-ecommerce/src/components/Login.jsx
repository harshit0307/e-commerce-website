import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthProvider"

const title = "Login"
const socialTitle  = "Login with Social Media"
const btnText = "Login Now"

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

const Login = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const { login } = useAuth()

    const from = location.state?.from?.pathname || "/"

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        login(email, password).then((result) => {
            alert("Login Successful !")
            navigate(from, {replace: true})
        }).catch((error) => {
            setErrorMessage("Please Provide email and password")
        })
    }

    // const handleRegister = () => {

    // }

  return (
    <div>
        <div className='login-section padding-tb section-bg'>
            <div className='container'>
                <div className='account-wrapper'>
                    <h3 className='title'>{title}</h3>
                    <form className='account-form' onSubmit={handleLogin}>
                        <div className='form-group'>
                            <input type="email" name='email' id='email' placeholder='Email Address *' required />
                        </div>
                        <div className='form-group'>
                            <input type="password" name='password' id='password' placeholder='Password *' required />
                        </div>

                        <div>
                            {
                                errorMessage && (
                                    <div className='error-message text-danger'>
                                        {errorMessage}
                                    </div>
                                )
                            }
                        </div>

                        <div className='form-group'>
                            <div className='d-flex justify-content-between flex-wrap pt-sm-2'>
                                <div className='checkgroup'>
                                    <input type="checkbox" name='remember' id='remember'/>
                                    <label htmlFor='remember'>Remember Me</label>
                                </div>
                                <Link to="/forgetpass">Forgot Password</Link>
                            </div>
                        </div>

                        <div className='form-group'>
                            <button type='submit' className='d-block lab-btn'>
                                <span>{btnText}</span>
                            </button>
                        </div>
                    </form>

                    <div className='account-bottom'>
                        <span className='d-block cate pt-10'>
                            Don't Have an Account? <Link to="/sign-up">Sign Up</Link>
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

export default Login