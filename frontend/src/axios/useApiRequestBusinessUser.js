import axios from "axios";
// import { useState } from 'react'

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/backend/api"
    : "https://beesmart.propulsion-learn.ch/backend/api";

const useApiRequest = axios.create({
  baseURL: BASE_URL,
});
export const GetMyBusinessPRofileData = async (token) => {
  return await useApiRequest.get("/users/customer/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default useApiRequest;
