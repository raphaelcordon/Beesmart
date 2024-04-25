import AxiosMotion from "./_base.js";

const axios = AxiosMotion;

export const getActiveUserVouchers = async () => {
  try {
    const config = getAxiosConfig();
    const res = await axios.get(`/voucher/enduser/active/`, config);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "User don\'t have any vouchers.");
}
};

export const getUsedUserVouchers = async () => {
    try {
      const config = getAxiosConfig();
      const res = await axios.get(`/voucher/enduser/used/`, config);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "User don\'t have any vouchers.");
  }
  };

const getAxiosConfig = () => {
  const token = window.localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const config = {
    headers,
  };

  return config;
};
