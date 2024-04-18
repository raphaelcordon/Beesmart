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


// import axios from "axios";

// const BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:8000/backend/api"
//     : "https://beesmart.propulsion-learn.ch/backend/api";

// const useApiRequest = axios.create({
//   baseURL: BASE_URL,
// });

// // Function to send a request with the provided method, endpoint, and data
// export const sendRequest = async (method, endpoint, data = null, token = null) => {
//   try {
//     const config = {
//       method,
//       url: endpoint,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//       data: data ? JSON.stringify(data) : null,
//     };

//     const response = await useApiRequest(config);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export default useApiRequest;