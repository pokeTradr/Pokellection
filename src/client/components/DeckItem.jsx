import React, { useState } from "react";

function DeckItem(props) {
  const [isHoveredOver, setIsHoveredOver] = useState(null);

  const onHoverHandler = (index) => {
    console.log(index);
    console.log("in the OnHoverHandler");
    setIsHoveredOver(index);
  };

  const notOnHoverHandler = (index) => {
    console.log("in the notOnHoverHandler");
    setIsHoveredOver(null);
  };

  return (
    <div
      className="card"
      key={props.index}
      style={{
        cursor: "pointer",
        position: "absolute",
        left: `${props.index * 50}px`,
        zIndex:
          isHoveredOver === props.index ? props.listLength + 1 : props.index,
        transform: isHoveredOver === props.index ? "scale(1.1)" : "scale(1)",
        transition: "transform .4s ease-out",
      }}
      onMouseOver={() => onHoverHandler(props.index)}
      onMouseLeave={() => notOnHoverHandler(props.index)}
      onClick={props.onClick}
    >
      {props.pokemon.images.large ? (
        <img className="card" src={props.pokemon.images.large} />
      ) : (
        <img className="card" src={props.pokemon.images.small} />
      )}
    </div>
  );
}

export default DeckItem;
