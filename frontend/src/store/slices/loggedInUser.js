import {createSlice} from '@reduxjs/toolkit'

export const loggedInUser = createSlice({
    name: 'current-user',
    initialState: {user: undefined, accessToken: undefined},
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
        logoutUser: (state) => {
            state.user = null
            state.accessToken = null
        }
    },
})
export const {loginUser, logoutUser} = loggedInUser.actions
export default loggedInUser.reducer
