import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';
function Login() {

  const [signState, setSignState] = useState("Log In")

  return (
    <div className='login'>
      <NavLink to="/"><img src={logo} alt='Logo' className='login-logo' /></NavLink>

      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? <input type="text" placeholder='Enter your name' /> : <></>}

          <input type='email' placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button>{signState}</button>
        </form>
        <div className="switch-acc">
          {signState === "Log In" ? <p>Don't have an account? <span onClick={() => { setSignState("Sign Up") }}>Sign Up</span></p> : <p>Have an account? <span onClick={() => { setSignState("Log In") }}>Log In</span></p>}

        </div>
      </div>
    </div>
  )
}

export default Login