import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {storeUserData} from "../store/slices/userSlice.js";
import {GetMeUser} from "../axios/axiosUser.js";

const useGetMeUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const getUser = useCallback(async () => {
        setError(null);
        try {
            const res = await GetMeUser();
            dispatch(storeUserData(res));
        } catch (error) {
            setError(error.message || "An error occurred retrieving user.");
            throw error;
        }
    }, [dispatch]);

    return { getUser, error };
};

export default useGetMeUser;