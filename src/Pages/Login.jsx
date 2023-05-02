import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('/login', {
            username,
            password
        })
        .then(response => {
            navigate('/home')
        })
        .catch(err => {
            <p>User not found</p>
        })
    }
    
    return (
        <div className='login_container'>
            Log in
            <form onSubmit={submitHandler}>
              <input type ='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              <input type = 'password' placeholder = 'Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button type='submit'>Login</button>
            </form>
        </div>
    ) 
}


export default Login;