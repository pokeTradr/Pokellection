import React, { useState } from "react";
import SearchBar from "../components/searchBar"
import PokemonCard from "../components/pokemonCard"
import CardDetail from "../components/cardDetail"

export default function MainContainer(props) {
  const fakeProps={card: 'card1', name: 'name1', price: '$500', };
  //initialize state to one pokemon fetched from server
  const [data, setData] = useState(fakeProps);
  //update state whenever data is fetched from server
  return(
  <div id="main">
    <SearchBar data={data} setData={setData}/> 
    <div id="pokemonInfo">
      <PokemonCard card={data.card}/>
      <CardDetail name={data.name}price={data.price}/>
    </div>
  </div>
  )
}

