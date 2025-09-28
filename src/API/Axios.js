import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-4e23e/us-central1/api",
  baseURL: "https://amazon-api-deployment-bksx.onrender.com/",
});

export {axiosInstance};