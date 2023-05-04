import { createSlice } from "@reduxjs/toolkit";

// State management for keeping track of current cards in collection 
// New card will be added to state
export const deckListSlice = createSlice({
    name: 'deckList',
    initialState: {
        list: []
    },
    reducers: {
        addCard: (state, action) => {
            state.list.push(action.payload);
        }  
    }
})

export const { addCard } = deckListSlice.actions

export default deckListSlice.reducer;
