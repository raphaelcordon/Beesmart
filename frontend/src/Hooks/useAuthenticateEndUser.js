import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {AuthenticateCustomer} from "../axios/axiosCustomer.js";
import {loginUserEndUser, storeUserEndUserData} from "../store/slices/userEndUserSlice.js";

const useAuthenticateEndUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const authenticateEndUser = useCallback(async (email, password) => {
        setError(null);
        try {
            const authResponse = await AuthenticateCustomer(email, password);
            window.localStorage.setItem("accessToken", authResponse.access);
            dispatch(loginUserEndUser(authResponse.access));
            dispatch(storeUserEndUserData(authResponse.user));
        } catch (error) {
            setError(error.message || "An error occurred during login.");
            throw error;
        }
    }, [dispatch]);

    return { authenticateEndUser, error };
};
export default useAuthenticateEndUser;