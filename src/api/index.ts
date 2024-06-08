export * from "./AddonAPI";
export * from "./ExtrasAPI";
export * from "./TruckAPI";
export * from "./MenuItemAPI";
export * from "./UsersAPI";
export * from "./AuthAPI";
export * from "./ImageAPI";

import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api/",
  baseURL: "https://taco-backend.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
