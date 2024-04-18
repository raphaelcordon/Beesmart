import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: window.localStorage.getItem('accessToken') || undefined,
        userData: [],
    },
    login_user: (state, action) => {
      state.accessToken = action.payload
    },
    logout_user: (state) => {
      state.accessToken = null;
      state.userData = null;
    },
    storeUserData: (state, action) => {
            state.userData = action.payload;
        }
})

export const { loginUser, logoutUser, storeUserData } = userSlice.actions;
export default userSlice.reducer;