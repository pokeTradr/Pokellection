import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetDecklist } from "../../redux/DeckList";
import { useState } from "react";
import { pokemonCard } from "../../redux/currentCard";
import { storeUser } from "../../redux/user";

const Header = () => {
  const { list } = useSelector((state) => state.deckList);
  const decklist = [...list];
  // gets a list of deck elements
  const totalValue = decklist.reduce((acc, el) => {
    return acc + el.cardmarket.prices.averageSellPrice;
  }, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleClickRouter = (path) => {
    dispatch(storeUser(""));
    navigate(path);
    dispatch(resetDecklist());
    dispatch(pokemonCard([]));
  };

  return (
    <>
      <div className="header">
        <h1 className="headertitle"> PoKéllectioN</h1>
        <div className="btn_container_header">
          <button className="collection-btn" onClick={toggleModal}>
            {" "}
            Deck information{" "}
          </button>
          <button
            className="deletecollection-btn"
            onClick={() => dispatch(resetDecklist())}
          >
            {" "}
            Delete Entire Collection{" "}
          </button>
          <button
            className="collection-btn"
            onClick={() => handleClickRouter("/")}
          >
            {" "}
            Sign Out{" "}
          </button>
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <div className="modal-text">
                <div>Total number of cards in deck:{decklist.length}</div>
                <div>
                  Total value of cards: $
                  {`${Math.floor(totalValue * 100) / 100}`}
                </div>
              </div>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
