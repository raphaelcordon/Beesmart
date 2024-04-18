import {configureStore} from '@reduxjs/toolkit'
import userCustomerReducer from './slices/userCustomerSlice.js';


export default configureStore({
    reducer: {
        customer: userCustomerReducer,
    },
},)
