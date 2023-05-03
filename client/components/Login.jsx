import React, { useState, useEffect } from 'react';

const Login = () => {
const [ username, setUsername ] = useState('')
const [ password, setPassword ] = useState('')
const [ submitted, setSubmit ] = useState(false)


const usernameHandler = (e) => {
    setUsername(e.target.value)
}

const passwordHandler = (e) => {
    setPassword(e.target.value)
}

const newUserSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
        alert("Please fill out all of the fields");
    } else {
      setSubmit(true);
    }
}

const successMessage = () => {
    if (submitted) {
        window.location.replace('/home')
    }
    return (
      <div
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>{username} successful login!</h1>
      </div>
    );
  };

return (

<body class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
<div class="text-green-600 text-lg font-bold">{successMessage()}</div>
<h1 class="font-bold text-2xl p-2 m-2">Welcome Back to Digi-Deck!</h1>
<div class="flex flex-col items-center justify-center p-0 m-0"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" width="15%" height="10%" align-items="center"></img></div>
<form class="flex flex-col bg-white rounded shadow-lg p-10 mt-7" action="">
    <label class="font-semibold text-xs" for="usernameField">Username</label>
    <input onChange={usernameHandler} value={username} class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text"/>
    <label class="font-semibold text-xs mt-3" for="passwordField">Password</label>
    <input onChange={passwordHandler} value={password} class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"type="password"/>
    <button class="flex items-center justify-center h-12 px-6 w-64 bg-Pokeblue mt-8 rounded font-semibold text-sm text-white hover:bg-Pokeliteblue" onClick={newUserSubmit}>Login</button>
    <div class="flex mt-6 justify-center text-xs">
        <a class="text-blue-400 hover:text-blue-500" href="/signup">Sign Up</a>
    </div>
</form>

</body>
)}

export default Login;