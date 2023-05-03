import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
    name: 'currentCard',
    initialState: {
        currentCard: [],
        collection: []
    },
    reducers: {
        addCard: (state, action) => {
            state.collection.push(action.payload);
        },
        getCard: (state, action) => {
            state.currentCard[0] = action.payload;
        }
    }
})


export const { addCard, getCard } = cardSlice.actions

export default cardSlice.reducer;

