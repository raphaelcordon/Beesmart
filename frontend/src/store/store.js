import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js';


export default configureStore({
    reducer: {
        user: userReducer,
    },
},)
