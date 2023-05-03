import React from 'react'
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Card(props) {
    const navigate = useNavigate();

    const goHome = () => {
      window.alert('GO HOME!');
      navigate('/home');
    };

    return(
    <div>
      <button onClick={goHome}>Go Home</button>
      <img src="https://tcg.pokemon.com/assets/img/parents-guide/about/en-us/SM11_55.jpg" className="card-image"></img>
    </div>
    )
}


//creating card component: https://daisyui.com/components/card/
//to show stats like price, name, etc for cards https://daisyui.com/components/stat/
