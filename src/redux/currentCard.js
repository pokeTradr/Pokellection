import { createSlice } from '@reduxjs/toolkit';

// State management for keeping track of current card being displayed, and all of its different versions.
// State will be replaced by a new card every time a new search is made
export const currentCardSlice = createSlice({
  name: 'currentCard',
  initialState: {
    cardVersions: [],
    currentInput: '',
  },
  reducers: {
    pokemonCard: (state, action) => {
        state.cardVersions = action.payload;
      //   state.cardVersions = [...state.cardVersions, action.payload];

      // state.cardVersions.push(action.payload);
    },
    searchCard: (state, action) => {
      state.currentInput = action.payload;
    },
  },
});

export const { pokemonCard, searchCard } = currentCardSlice.actions;

export default currentCardSlice.reducer;
