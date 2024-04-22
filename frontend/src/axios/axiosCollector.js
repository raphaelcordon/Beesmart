import AxiosMotion from "./_base.js";

const axios = AxiosMotion;


export const RegisterNewCollector = async (data) => {
try{
    const config = getAxiosConfig();
    const res = await axios.post("/collector/validate/", data, config );
    return res.data;
} catch (error) {
    console.error("Registration error: ", error.response?.data?.message || "Failed to register collector");
    throw new Error(error.response?.data?.message || "Failed to register collector");
}
}


export const getCollectorByEndUser = async (campaignId) => {
try{
    const res = await axios.get(`/campaign/enduser/${campaignId}`);
    return(res.data);
} catch (error) {
    console.error(error);
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