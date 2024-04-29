import AxiosMotion from "./_base.js";

const axios = AxiosMotion;

export const RegisterNewEndUser = async (email) => {
    try{
        await axios.post("/enduser/user/add/", { email } );
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
        const res = await axios.post(`/enduser/user/verify/${userData.secret_key}/`, userData, {
            responseType: 'blob', // Important: This tells Axios to handle the response as a blob
          });
        return res.data;
    } catch (error) {
        throw error("Not possible to fetch data");
    }
}

export const GetEndUserBySecretKey = async (secret_key) => {
    try{
        const res = await axios.get(`/enduser/user/${secret_key}/`);
        return res.data;
    } catch (error) {
        throw error("Not possible to fetch data");
    }
}

export const GetEndUserCard = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get(`/enduser/user/card/`, config);
        console.log(res)
        return res.data;
    } catch (error) {
        throw error("Not possible to fetch data");
    }
}

export const AuthenticateEndUser = async (email, password) => {
    try{
        const res = await axios.post(
            "/auth/token/", { email, password });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "No account found");
    }
 }

 export const GetMeEndUser = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get("/enduser/user/me/", config, {
            responseType: 'blob', // Important: This tells Axios to handle the response as a blob
          });
        return res.data;
    } catch (error) {
        throw error("Not possible fetch data");
    }
 }

export const DeleteMeUser = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.delete("/enduser/user/me/", config);
        return res.data;
    } catch (error) {
        throw error("Fail to delete, please try again");
    }
 }

export const UpdateMeUser = async (user) => {
    const config = getAxiosConfig();
    try {
      const res = await axios.patch("/enduser/user/update/", user, config);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
};

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