import { configureStore } from "@reduxjs/toolkit";
import currentCardReducer from './currentCard'
import collectionCardReducer from './collection'
import userReducer from './user'

// Stores holding all the reducers for all states
export default configureStore ({
    reducer: {
        user: userReducer,
        currentCard: currentCardReducer,
        collection: collectionCardReducer
    }
})  