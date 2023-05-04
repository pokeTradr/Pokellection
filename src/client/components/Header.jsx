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
        <h1 className="headertitle"> PoKéllectioN</h1>
        <div className="btn_container_header">
          <button className="deletecollection-btn"onClick={() => dispatch(resetDecklist())}> Delete Entire Collection </button>
          <button className="collection-btn" onClick={() => handleClickRouter("/")}> Sign Out<output></output> </button>
        </div>
      </div>
    );
}

export default Header;