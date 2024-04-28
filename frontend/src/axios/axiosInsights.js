import AxiosMotion from "./_base.js";

const axios = AxiosMotion;


export const getInsightStamps = async (campaignId) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get(`/insights/stamps/${campaignId}`, config);
        return(res.data);
    } catch (error) {
        console.error(error);
    }
}

export const getInsightVisits = async (campaignId) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get(`/insights/visits/${campaignId}`, config);
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