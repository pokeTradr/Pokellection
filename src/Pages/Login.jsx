import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { storeUser } from '../redux/user';
import { useDispatch, useSelector } from 'react-redux';


// Verifies if user exists in the database. If it does, it will redirect to the home page
const Login = () => {

    const { username } = useSelector(state => state.user)
    const [password, setPassword] = useState('')    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        console.log('ENTERING SUBMITHANDER FOR LOGIN FEATURE')
        e.preventDefault();
        axios.post('/login', {
            username,
            password
        })
        .then(response => {
            console.log(response);
            if (response.data === true) {
                console.log('entering the response for login')
                navigate('/home')
            } else {
                console.log('ENTERING USER NOT FOUND')
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
              <input type="text" id="Username" placeholder = 'Username' onChange={e => dispatch(storeUser(e.target.value))} />
              <input type = 'password' placeholder = 'Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button type='submit'>Login</button>
            </form>
        </div>
    ) 
}


export default Login;