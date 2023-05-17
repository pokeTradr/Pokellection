import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../../redux/DeckList";
import axios from "axios";

export default function cardDetail(props) {
  const { cardVersions } = useSelector((state) => state.currentCard);
  const { username } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.deckList);
  const dispatch = useDispatch();

  const val = useRef(true);

  const addToCollectionHandler = () => {
    dispatch(addCard(cardVersions.data));
  };

  useEffect(() => {
    if (val.current == true) {
      val.current = false;
      // dispatch(addCard(response.data.userData))
      return;
    }

    console.log("this is list: ", list);
    axios
      .post("/save", {
        username,
        deckList: list,
      })
      .then((res) => {
        console.log("collection saved to the database");
      })
      .catch((err) => {
        console.log("error saving collection to database");
      });
  }, [list]);

  if (cardVersions.length === 0) {
    return <div>Test</div>;
  }

  if (cardVersions.length !== 0) {
    return (
      <div  className="pokemon_img">
        <img
          onClick={addToCollectionHandler}
          src={cardVersions.data.images.small}
        ></img>
        <div className="price" key={Math.random()}>
          $ {cardVersions.data.cardmarket.prices.averageSellPrice}
        </div>
      </div>
    );
  }
}

