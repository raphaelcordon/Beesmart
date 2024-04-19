import { createSlice } from "@reduxjs/toolkit"

export const userCustomerSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: window.localStorage.getItem('accessToken') || null,
        userCustomerData: null, // Changed from [] to null for single user data
    },
    reducers: {
        loginUserCustomer: (state, action) => {
            state.accessToken = action.payload;
        },
        logoutUserCustomer: (state) => {
            state.accessToken = null;
            state.userCustomerData = null; // Reset user data on logout
        },
        storeUserCustomerData: (state, action) => {
            state.userCustomerData = action.payload;
        },
        // updateUserProfile: (state, action) => {
        //     // Merge updated profile data into existing user data
        //     state.userCustomerData = {
        //         ...state.userCustomerData,
        //         ...action.payload,
        //     };
        // },
    },
});

export const { loginUserCustomer, logoutUserCustomer, storeUserCustomerData } = userCustomerSlice.actions;
export default userCustomerSlice.reducer;
