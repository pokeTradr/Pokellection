import React from 'react';
import DeckItem from './DeckItem';
import { useSelector } from 'react-redux';

import Icons from '../../assets/type-icons/typeIcons';

function analyzeDeck(decklist) {
  // gets a list of deck elements
  const totalValue = decklist.reduce((acc, el) => {
    return acc + el.cardmarket.prices.averageSellPrice;
  }, 0);
  console.log('totalValue of Collection:', totalValue);
  // #cards by type
  const cardTypes = {};
  decklist.map((el) => {
    // add to cardTypes
    // iterate over the array of types
    el.types.forEach((type) => {
      cardTypes[type] = 1 + (cardTypes[type] ?? 0);
    });
  });
  console.log(cardTypes);
  const iconsToRender = Object.keys(cardTypes).map((type) => {
    return Icons[type] ? (
      <img src={Icons[type]} className='deck-type-icon' />
    ) : null;
  });

  return (
    <div className='deck-stats-container'>
      <div>Total Deck Value: {totalValue}</div>
      <div className='deck-type-container'>{iconsToRender}</div>
    </div>
  );
}

function List() {
  const { list } = useSelector((state) => state.deckList);

  return (
    <div className='collection'>
      {console.log('list: ', list)};{console.log('list[0]: ', list[0])};
      {list.map((el, index) => (
        <DeckItem pokemon={el} index={index + 1} listLength={list.length} />
      ))}
      {analyzeDeck(list)}
    </div>
  );
}

export default List;
