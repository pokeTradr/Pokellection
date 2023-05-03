import React from 'react'
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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
      <h1 className="text-primary text-4xl font-bold">I am using Tailwind</h1>
    </div>
    )
}