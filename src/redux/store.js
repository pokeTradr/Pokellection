import { configureStore } from "@reduxjs/toolkit";
import currentCardReducer from './currentCard'
import DecklistCardReducer from './Decklist'
import userReducer from './user'

// Stores holding all the reducers for all states
export default configureStore ({
    reducer: {
        user: userReducer,
        currentCard: currentCardReducer,
        Decklist: DecklistCardReducer
    }
})  