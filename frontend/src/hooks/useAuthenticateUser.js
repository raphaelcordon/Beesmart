import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {AuthenticateCustomer} from "../axios/axiosUser.js";
import {loginUser, storeUserData} from "../store/slices/userSlice.js";

const useAuthenticateUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const authenticate = useCallback(async (email, password) => {
        setError(null);
        try {
            const authResponse = await AuthenticateCustomer(email, password);
            window.localStorage.setItem("accessToken", authResponse.access);
            dispatch(loginUser(authResponse.access));
            dispatch(storeUserData(authResponse.user));
        } catch (error) {
            setError(error.message || "An error occurred during login.");
            throw error;
        }
    }, [dispatch]);

    return { authenticate, error };
};
export default useAuthenticateUser;