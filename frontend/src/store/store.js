import {configureStore} from '@reduxjs/toolkit'
import userCustomerReducer from './slices/userCustomerSlice.js';
import userEndUserReducer from './slices/userEndUserSlice.js';


export default configureStore({
    reducer: {
        customer: userCustomerReducer,
        endUser: userEndUserReducer,
    },
},)
