import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()

    const submitHandler = (e) => {
        // console.log('ENTERING SUBMITHANDER FOR LOGIN FEATURE')
        e.preventDefault();
        axios.post('/login', {
            username,
            password
        })
        .then(response => {
            console.log(response);
            if (response.data === true) {
                console.log('entering the response for login')
                // console.log(response);
                navigate('/home')
            } else {
                console.log('ENTERING USER NOT FOUND')
                // return <p>USER NOT FOUND</p>
            }
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