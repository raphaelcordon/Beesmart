import AxiosMotion from "./_base.js";

const axios = AxiosMotion;


 export const RegisterNewCustomer = async (email) => {
    try{
        await axios.post("/users/customer/add/", { email } );
    } catch (error) {
        throw error("Fail, please try again");
    }
 }

  export const RegisterCustomerValidation = async (userData) => {
    try{
        const res = await axios.patch("/users/customer/veryfi/", userData);
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
        throw error("No account found");
    }
 }

 //  export const RegisterCustomerDetails = async (userData) => {
 //    try{
 //        const config = getAxiosConfig();
 //        const res = await axios.patch("/users/me/", userData, config);
 //        return res.data.access;
 //    } catch (error) {
 //        console.error(error);
 //        throw error;
 //    }
 // }


  // const getAxiosConfig = () => {
  //   const token = window.localStorage.getItem("accessToken");
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   }
  //
  //   const config = {
  //     headers,
  //   }
  //
  //   return config
  // }