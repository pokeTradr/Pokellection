import React from 'react';
import DeckItem from './DeckItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeCard } from "../../redux/DeckList";

function List() {
  const dispatch = useDispatch()
  const { list } = useSelector((state) => state.deckList);


  const clickHandler = (index) => {
    dispatch(removeCard(index));
  };

  return (
    <div className='collection'>
      {console.log('list: ', list)};{console.log('list[0]: ', list[0])};
      {list.map((el, index) => (
        <DeckItem pokemon={el} index={index + 1} listLength={list.length} onClick = {() => clickHandler(index)}/>
      ))}
    </div>
  );
}

export default List;
