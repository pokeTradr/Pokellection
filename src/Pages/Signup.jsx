import React, { useState, useNavigate }  from 'react';
import axios from 'axios';

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
            navigate('./home')
        })
        .catch((error) => console.log('username already exists'))
    }
    return (
        <div className='signupForm'>
            <form>
            <input type="text" id="username" name="username" placeholder = 'username' onChange={e => setUsername(e.target.value)} />
            <input type="text" id="password" name="password" placeholder = 'password' onChange={e => setPassword(e.target.value)} />
            </form>
        </div>
    ) 
}


export default Signup;