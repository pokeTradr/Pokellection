import React, { useState } from 'react';
import axios from 'axios';
import { pokemonCard } from '../../redux/currentCard';
import { searchCard } from  '../../redux/currentCard'
import { useDispatch, useSelector } from 'react-redux';


export default function (props) {

  const dispatch = useDispatch();
  // const { username } = useSelector(state => state.user)

  // const { currentInput } = useSelector(state => state.currentCard);
  const { cardVersions } = useSelector(state => state.currentCard);

  const [input, setInput] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/getPokemon', {
      name: input,
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
    <>
    <div id='searchBarContainer'>
    <form className='form' id='searchForm' onSubmit={handleSubmit}>
      <input className='searchBar'
        type='text'
        placeholder='Search Pokemon'
        onChange={(e) => setInput(e.target.value)}
      />
      {/* <a href="javascript:document.myform.submit()" onClick={return } */}
      {/* // <img id='pokeball' src="https://i.ibb.co/C0cLH5V/pngegg.png" alt="pngegg" border="0" onClick={}></img> */}
      <input id='searchSubmitBtn' type='image' src='https://i.ibb.co/C0cLH5V/pngegg.png' value='submit' />
    </form>
    </div>
    </>
  );
}


// <a href="https://ibb.co/7yfh1Jr"><img src="https://i.ibb.co/C0cLH5V/pngegg.png" alt="pngegg" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>add image to google</a><br />

// background-image: url("../../media/examples/lizard.png");