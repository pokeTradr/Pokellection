import React, { useState } from 'react';
import axios from 'axios';
import { pokemonCard } from '../../redux/currentCard';
import { searchCard } from  '../../redux/currentCard'
import { useDispatch, useSelector } from 'react-redux';


export default function (props) {

  const dispatch = useDispatch();
  // const { username } = useSelector(state => state.user)

  const { currentInput } = useSelector(state => state.currentCard);
  const { cardVersions } = useSelector(state => state.currentCard);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/getPokemon', {
      name: currentInput,
    })
      .then((data) => {
        console.log('this is my data :', data);
        dispatch(pokemonCard(data))
        // props.setData(data);
        // dispatch(get)
      });
    // fetch imaginary endpoint from server with searchInput as req body
    // promise chain
    // setData(res)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Start Searching...'
        onChange={(e) => dispatch(searchCard(e.target.value))}
      />
      <input type='submit' />
    </form>
  );
}
