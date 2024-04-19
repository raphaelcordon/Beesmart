import AxiosMotion from "./_base.js";

const axios = AxiosMotion;


 export const RegisterNewCustomer = async (email) => {
    try{
        await axios.post("/customer/user/add/", { email } );
    } catch (error) {
        throw error("Fail, please try again");
    }
 }

  export const RegisterCustomerValidation = async (userData) => {
    try{
        const res = await axios.patch("/customer/user/verify/", userData);
        return res.data.access;
    } catch (error) {
        console.error(error);
        throw error;
    }
 }

 export const AuthenticateCustomer = async (email, password) => {
    try{
        const res = await axios.post(
            "/auth/token/", { email, password });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "No account found");
    }
 }

  export const RegisterCustomerDetails = async (userData) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.patch("/customer/user/me/", userData, config);
        return res.data.access;
    } catch (error) {
        console.error(error);
        throw error;
    }
 }

export const GetMeUser = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get("/customer/user/me/", config);
        return res.data;
    } catch (error) {
        throw error("Not possible fetch data");
    }
 }

 export const DeleteMeUser = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.delete("/customer/user/me/", config);
        return res.data;
    } catch (error) {
        throw error("Fail to delete, please try again");
    }
 }

export const UpdateMeUser = async (user) => {
    const config = getAxiosConfig();
    const body = JSON.stringify(user);
  
    try {
      const res = await axios.patch("/customer/user/update/", body, config);
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