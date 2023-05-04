import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import videoBG from '../assets/team-rocket.mp4';


// Front page that will allow users to either sign up or log in
function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className='front-page-container'>
      <video src={videoBG} autoPlay muted loop />
      <div className='front-page-interface'>
        <h1>PoKéllectioN</h1>
        <div className='buttons-container'>
          <button className='signup_btn' onClick={() => navigate('./Signup')}>
            Sign Up
          </button>
          <button className='login_btn' onClick={() => navigate('./Login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
