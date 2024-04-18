import { createSlice } from "@reduxjs/toolkit"

export const userEndUserSlice = createSlice({
    name: "endUser",
    initialState: {
        accessToken: window.localStorage.getItem('accessToken') || null,
        userEndUserData: [],
    },
    reducers: {
        loginUserEndUser: (state, action) => {
            state.accessToken = action.payload;
        },
        logoutUserEndUser: (state) => {
            state.accessToken = null;
            state.userData = null;
        },
        storeUserEndUserData: (state, action) => {
            state.userEndUserData = action.payload;
        },
    },
});

export const { loginUserEndUser, logoutUserEndUser, storeUserEndUserData } = userEndUserSlice.actions;
export default userEndUserSlice.reducer;