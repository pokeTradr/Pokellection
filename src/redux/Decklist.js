import { createSlice } from "@reduxjs/toolkit";

// State management for keeping track of current cards in collection 
// New card will be added to state
export const DecklistSlice = createSlice({
    name: 'Decklist',
    initialState: {
        Decklist: []
    },
    reducers: {
        addCard: (state, action) => {
            state.Decklist.push(action.payload);
        },  
    }
})

export const { addCard } = DecklistSlice.actions

export default DecklistSlice.reducer;
