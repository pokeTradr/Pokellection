import React, { useState } from "react";
import axios from "axios";
import { pokemonCard } from "../../redux/currentCard";
import { useDispatch } from "react-redux";

export default function (props) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/getPokemon", {
        name: input,
      })
      .then((data) => {
        console.log("this is my data :", data);
        dispatch(pokemonCard(data));
      });
  };

  return (
    <>
      <div id="searchBarContainer">
        <form className="form" id="searchForm" onSubmit={handleSubmit}>
          <input
            className="searchBar"
            type="text"
            placeholder="Search Pokemon"
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            id="searchSubmitBtn"
            type="image"
            src="https://i.ibb.co/C0cLH5V/pngegg.png"
            value="submit"
          />
        </form>
      </div>
    </>
  );
}
