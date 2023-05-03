import React from 'react'
import { redirect } from 'react-router';
import { useNavigate } from 'react-router';


export default function Card(props) {
    const navigate = useNavigate();

    const goTheFuckHome = () => {
      window.alert('GO HOME!');
      navigate('/home');
    };

    return(
    <div className="card">
      <button onClick={goTheFuckHome}>Go Home</button>
      <img src="https://tcg.pokemon.com/assets/img/parents-guide/about/en-us/SM11_55.jpg" className="card-image"></img>
      <p>Price: $2</p>
    </div>
    )
}