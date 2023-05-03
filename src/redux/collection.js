import { createSlice } from "@reduxjs/toolkit";

// State management for keeping track of current cards in collection 
// New card will be added to state
export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
    
    },
    reducers: {
        addCard: (state, action) => {
            state.collection.push(action.payload);
        },  
    }
})

export const { addCard } = collectionSlice.actions

export default collectionSlice.reducer;

