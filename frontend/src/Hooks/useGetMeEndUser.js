import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {storeUserEndUserData} from "../store/slices/userEndUserSlice.js";
import {GetMeEndUser} from "../axios/axiosEndUser.js";

const useGetMeEndUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const getUser = useCallback(async () => {
        setError(null);
        try {
            const res = await GetMeEndUser();
            dispatch(storeUserEndUserData(res));
        } catch (error) {
            setError(error.message || "An error occurred retrieving user.");
            throw error;
        }
    }, [dispatch]);

    return { getUser, error };
};

export default useGetMeEndUser;