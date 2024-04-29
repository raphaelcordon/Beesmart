import AxiosMotion from "./_base.js";

const axios = AxiosMotion;


export const getInsightPoints = async (campaignId) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get(`/insights/points/${campaignId}`, config);
        console.log('axios points', res)
        return(res.data);
    } catch (error) {
        console.error(error);
    }
}
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
export const getInsightVouchers = async (campaignId) => {
    try{
        const config = getAxiosConfig();
        const res = await axios.get(`/insights/vouchers/${campaignId}`, config);
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