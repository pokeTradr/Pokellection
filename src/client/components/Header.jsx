import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetDecklist } from "../../redux/DeckList";



const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list } = useSelector(state => state.deckList);



    const handleClickRouter = path => {
        navigate(path)
    }

    return (
      <div className="header"> 
        <span className="headertitle"> <h1>PoKéllectioN</h1> </span>
        <div>
        <button className="deletecollection-btn"onClick={() => dispatch(resetDecklist())}> Delete Entire Collection </button>
        </div>
        <div>
        <button className="Collection-btn" onClick={() => handleClickRouter("/")}> Sign <output></output> </button>
        </div>
      </div>
    );
}

export default Header;