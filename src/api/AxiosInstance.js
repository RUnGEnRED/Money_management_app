import axios from "axios";

// Create an Axios instance with a base URL for API requests
const AxiosInstance = axios.create({
  // baseURL: "https://192.168.1.61:3000/", // Use your local IP address for testing on physical devices
  baseURL: "http://10.0.2.2:3000/", // Use 10.0.d.d for Android emulator
  // baseURL: "http://localhost:3000/", // Use localhost for iOS simulator
  responseType: "json",
  withCredentials: true,
  timeout: 3000,
});

export default AxiosInstance;
