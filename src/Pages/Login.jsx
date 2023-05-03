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
        // console.log('ENTERING SUBMITHANDLER FOR LOGIN FEATURE')
        e.preventDefault();
        axios.post('/login', {
            username,
            password
        })
        .then(response => {
            // console.log(response);
            if (response.data.truthy === true) {
                // console.log('entering the response for login')
                // console.log(response.data.userData)
                if(response.data.userData.length >= 1){
                    dispatch(addCard(response.data.userData))
                }
                navigate('/home')
            } else {
                console.log('ENTERING USER NOT FOUND')
            }
        })
        .catch(err => {
            console.log('error logging into user')
        })
    }
    
    return (
        <div className='login_container'>
            <h1>Log in</h1>
            <form onSubmit={submitHandler}>
              <input type="text" id="Username" placeholder = 'Username' onChange={e => dispatch(storeUser(e.target.value))} />
              <input id='Password'type = 'password' placeholder = 'Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button className='submit_b'type='submit'>Login</button>
            </form>
        </div>
    ) 
}


export default Login;