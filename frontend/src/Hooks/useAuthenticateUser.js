import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {AuthenticateCustomer} from "../axios/axiosCustomer.js";
import {loginUserCustomer, storeUserCustomerData} from "../store/slices/userCustomerSlice.js";

const useAuthenticateUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const authenticateCustomer = useCallback(async (email, password) => {
        setError(null);
        try {
            const authResponse = await AuthenticateCustomer(email, password);
            window.localStorage.setItem("accessToken", authResponse.access);
            dispatch(loginUserCustomer(authResponse.access));
            dispatch(storeUserCustomerData(authResponse.user));
        } catch (error) {
            setError(error.message || "An error occurred during login.");
            throw error;
        }
    }, [dispatch]);

    return { authenticateCustomer, error };
};
export default useAuthenticateUser;