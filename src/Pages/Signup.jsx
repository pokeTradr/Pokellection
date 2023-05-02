import React, { useState }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleSignUp = (e) => {
        e.preventDefault()
        axios.post('/signup', {
            username,
            password
        })
        .then((data) => {
            navigate('/home')
        })
        .catch((error) => console.log('username already exists'))
    }
    return (
        <div className='signupForm'>
            Create User
            <form onSubmit={handleSignUp}>
            <input type="text" id="username" placeholder = 'Username' onChange={e => setUsername(e.target.value)} />
            <input type="text" id="password" placeholder = 'Password' onChange={e => setPassword(e.target.value)} />
            <input className='submit_btn' type="submit"/>
            </form>
        </div>
    ) 
}


export default Signup;