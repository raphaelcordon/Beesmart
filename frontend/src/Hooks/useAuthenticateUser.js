import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {AuthenticateCustomer} from "../axios/axiosCustomer.js";
import {loginUserEndUser, storeUserEndUserData} from "../store/slices/userEndUserSlice.js";
import {loginUserCustomer, storeUserCustomerData} from "../store/slices/userCustomerSlice.js";

const useAuthenticateUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const authenticateUser = useCallback(async (email, password) => {
        setError(null);
        try {
            const authResponse = await AuthenticateCustomer(email, password);
            window.localStorage.setItem("accessToken", authResponse.access);
            if (authResponse.customer){
                dispatch(loginUserCustomer(authResponse.access));
                dispatch(storeUserCustomerData(authResponse.user));
                return 'customer';
            }
            else {
                dispatch(loginUserEndUser(authResponse.access));
                dispatch(storeUserEndUserData(authResponse.user));
                return 'endUser';
            }
        } catch (error) {
            setError(error.message || "An error occurred during login.");
            throw error;
        }
    }, [dispatch]);

    return { authenticateUser, error };
};
export default useAuthenticateUser;