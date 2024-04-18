import {configureStore} from '@reduxjs/toolkit'
import {userSlice} from "./slices/userSlice.js";


export default configureStore({
    reducer: {
        userSlice: userSlice,
    },
},)
