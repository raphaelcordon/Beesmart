import AxiosMotion from "./_base.js";

const axios = AxiosMotion;


 export const RegisterNewCampaign = async (data) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.post("/campaign/", data, config );
        console.log(res)
        return res.data;
    } catch (error) {
        console.error("Registration error: ", error.response?.data?.message || "Failed to register campaign");
        throw new Error(error.response?.data?.message || "No account found");
    }
 }


export const getAllOpenCampaigns = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get("/campaign/", config);
        return(res.data);
    } catch (error) {
        console.error(error);
    }
 }

 export const getAllClosedCampaigns = async () => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get("/campaign/closed/", config);
        return(res.data);
    } catch (error) {
        console.error(error);
    }
 }

 export const getCampaignById = async (id) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get(`/campaign/${id}`, config);
        return(res.data);
    } catch (error) {
        console.error(error);
    }
 }

  export const patchCampaignById = async (id) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.patch(`/campaign/${id}`, config);
        return(res.data);
    } catch (error) {
        console.error(error);
    }
 }

export const deleteCampaignById = async (id) => {
try{
    const config = getAxiosConfig();
    const res = await axios.delete(`/campaign/${id}`, config);
    return(res.data);
} catch (error) {
    console.error(error);
}
}


export const getCampaignByEndUser = async (id) => {
try{
    const res = await axios.get(`/campaign/endUser/${id}`);
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