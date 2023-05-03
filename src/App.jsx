import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContainer from './client/containers/mainContainer';
import Navbar from './client/components/HomeScreen';
import FrontPage from './Pages/FrontPage';
import Signup from './Pages/Signup';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Error from './Pages/Error';

import './styles.css';

export default function App(props) {
  //navbar can go in router if you want it to render all the time
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}
