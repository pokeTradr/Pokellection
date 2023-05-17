import React from "react";
import { useSelector } from "react-redux";
import Icons from "../../assets/type-icons/typeIcons";

function ListStats() {
  const { list } = useSelector((state) => state.deckList);
  const decklist = [...list];
  // gets a list of deck elements
  const totalValue = decklist.reduce((acc, el) => {
    return acc + el.cardmarket.prices.averageSellPrice;
  }, 0);
  console.log("totalValue of Collection:", totalValue);
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
      <img src={Icons[type]} className="deck-type-icon" />
    ) : null;
  });

  return (
    <div className="deck-stats-container">
      <div className="deck-type-container">{iconsToRender}</div>
    </div>
  );
}

export default ListStats;
