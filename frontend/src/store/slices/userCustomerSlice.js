import { createSlice } from "@reduxjs/toolkit"

export const userCustomerSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: window.localStorage.getItem('accessToken') || null,
        userCustomerData: [],
    },
    reducers: {
        loginUserCustomer: (state, action) => {
            state.accessToken = action.payload;
        },
        logoutUserCustomer: (state) => {
            state.accessToken = null;
            state.userData = null;
        },
        storeUserCustomerData: (state, action) => {
            state.userCustomerData = action.payload;
        },
    },
});

export const { loginUserCustomer, logoutUserCustomer, storeUserCustomerData } = userCustomerSlice.actions;
export default userCustomerSlice.reducer;
