import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {storeUserCustomerData} from "../store/slices/userCustomerSlice.js";
import {GetMeUser} from "../axios/axiosCustomer.js";

const useGetMeUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const getUser = useCallback(async () => {
        setError(null);
        try {
            const res = await GetMeUser();
            dispatch(storeUserCustomerData(res));
        } catch (error) {
            setError(error.message || "An error occurred retrieving user.");
            throw error;
        }
    }, [dispatch]);

    return { getUser, error };
};

export default useGetMeUser;