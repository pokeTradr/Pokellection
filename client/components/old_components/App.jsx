import React, {useEffect, useState, useRef} from 'react';
import MainContainer from './containers/mainContainer';

import './styles.css';

export default function App(props) {
    const newUsername = useRef(null)
    const newPassword = useRef(null)

    const username = useRef(null)
    const password = useRef(null)
    const [isVisible, setIsVisible] = useState(false);
    function storeUser(){
        console.log(newUsername.current.value)
        console.log(newPassword.current.value)
        fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newUsername.current.value,
                password: newPassword.current.value
            })
        })
        .then(res => console.log("sucessful adding the user"))
        .catch(err => console.log(err))
    }

    function showComponent(event) {
        console.log(username.current.value)
        console.log(password.current.value)
        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
        .then(res => setIsVisible(res.json()))
        .catch(err => console.log(err))
        setIsVisible();
    }
    return (
        <div id="App">

            <div id="signup">
                <input placeholder="Create a Username" ref={newUsername}/>
                <input placeholder="Create a Password" ref={newPassword}/>
                <button onClick={storeUser}>Signup</button>
            </div>
            <div>
                <input placeholder="Username" ref={username}/>
                <input placeholder="Password" ref={password}/>
                <button onClick={showComponent}>Login</button>
            </div>
            {
                isVisible ? <MainContainer/> : null
            }
        </div>

    )
}

