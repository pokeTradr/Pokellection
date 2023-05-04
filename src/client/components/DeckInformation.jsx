import React, { Component, useState } from 'react';
import ListStats from './ListStats';
import { useSelector } from 'react-redux';


export default function getDeckData() {

    const { list } = useSelector((state) => state.deckList);
    const decklist = [...list];
    // gets a list of deck elements
    const totalValue = decklist.reduce((acc, el) => {
      return acc + el.cardmarket.prices.averageSellPrice;
    }, 0);


    const[modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }

    return (

        
        <>
        <button className='btn-modal' onClick={toggleModal}>
            Deck information
        </button>

        {modal && (
                    <div className='modal'>
                    <div className='overlay'>
                        <div className='modal-content'>
                            <div>Total number of cards in deck:{ decklist.length }</div>
                            <div>Total value of cards: { totalValue }</div>

                            

                            <button className='close-modal' onClick={toggleModal}>CLOSE</button>
                        </div>
                    </div>      
                </div>
        )}
        </>
    );
} 