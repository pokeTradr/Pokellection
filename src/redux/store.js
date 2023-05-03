import { configureStore } from "@reduxjs/toolkit";
import currentCardReducer from './currentCard'
import deckListCardReducer from './deckList'
import userReducer from './user'

// Stores holding all the reducers for all states
export default configureStore ({
    reducer: {
        user: userReducer,
        currentCard: currentCardReducer,
        deckList: deckListCardReducer
    }
})  