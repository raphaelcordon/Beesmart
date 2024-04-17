import {configureStore} from '@reduxjs/toolkit'
import loggedInUser from './slices/loggedInUser.js'


export default configureStore({
    reducer: {
        loggedInUser: loggedInUser,
        
    },
},)
