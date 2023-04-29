import React, { useState } from "react";
import SearchBar from "../components/searchBar"
import PokemonCard from "../components/pokemonCard"
import CardDetail from "../components/cardDetail"

export default function MainContainer(props) {
  return(
  <div id="main">
    <SearchBar/> 
    <div id="pokemonInfo">
      <PokemonCard/>
      <CardDetail/>
    </div>
  </div>
  )
}

