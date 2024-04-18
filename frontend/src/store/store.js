import {configureStore} from '@reduxjs/toolkit'
import userCustomerReducer from './slices/userCustomerSlice.js';
import userEndUserReducer from './slices/userEndUserSlice.js';
import campaignReducer from './slices/campaignSlice.js';


export default configureStore({
    reducer: {
        customer: userCustomerReducer,
        endUser: userEndUserReducer,
        campaign: campaignReducer,
    },
},)
