import axios from 'axios';

// Create an Axios instance with a base URL for API requests
const AxiosInstance = axios.create({
  baseURL: 'http://192.168.1.61:3000/', // Use 10.0.2.2 for Android emulator
});

export default AxiosInstance;
