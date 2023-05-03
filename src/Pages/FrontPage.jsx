import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles.css'


// Front page that will allow users to either sign up or log in
function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className='front-page-container'>
        <h1>Pokéllection</h1>
        <div className='buttons-container'>
            <button className='signup_btn' onClick={() => navigate('./Signup')}>Sign Up</button>
            <button className='login_btn' onClick={() => navigate('./Login')}>Login</button>
        </div>

    </div>
  )
}

export default FrontPage