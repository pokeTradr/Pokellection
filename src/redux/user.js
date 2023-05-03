import { createSlice } from "@reduxjs/toolkit";
// State management for keeping track of current card being displayed, and all of its different versions. 
// State will be replaced by a new card every time a new search is made
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: ''
    },
    reducers: {
        storeUser: (state, action) => {
            state.username = action.payload
        },
    }
})


export const { storeUser } = userSlice.actions;

export default userSlice.reducer;

