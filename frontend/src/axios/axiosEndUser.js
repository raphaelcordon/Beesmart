import AxiosMotion from "./_base.js";

const axios = AxiosMotion;

export const RegisterNewEndUser = async (email) => {
    try{
        const res = await axios.post("/enduser/user/add/", { email } );
        console.log(res)
    } catch (error) {
        console.log(error)
        throw error("Fail, please try again");
    }
}

export const GetMeUser = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get("/enduser/user/me/", config);
        return res.data;
    } catch (error) {
        throw error("Not possible to fetch data");
    }
}

export const PostEndUserVerify = async (userData) => {
    try{
        const res = await axios.post(`/enduser/user/verify/${userData.secret_key}`, userData);
        return res.data;
    } catch (error) {
        throw error("Not possible to fetch data");
    }
}

const getAxiosConfig = () => {
    const token = window.localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const config = {
      headers,
    }

    return config
}