import React from "react";
import Card from "./Card.jsx";

export default function Collections() {
  const cards = [<Card />, <Card />, <Card />];
  return (
    <div className="flex-container">
      {cards}
    </div>
  );
}