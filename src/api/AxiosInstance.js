import axios from "axios";

// Create an instance of axios with predefined configurations
const AxiosInstance = axios.create({
  baseURL: "http://10.0.2.2:3000/", // Use 10.0.2.2 for Android emulator
  // baseURL: "https://192.168.1.61:3000/", // Use your local IP address for testing on physical devices
  // baseURL: "http://localhost:3000/", // Use localhost for iOS simulator
  responseType: "json",
  withCredentials: true,
  timeout: 3000,
});

export default AxiosInstance;
