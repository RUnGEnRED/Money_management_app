// Import the axios instance and the authentication token service
import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

// Function to fetch categories from the API
const getCategories = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check for user authentication
    if (!user || !user.id) {
      throw new Error(t("reportService.messageNoAuth"));
    }
    // Make request to get categories
    const response = await AxiosInstance.get(`/categories?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching categories:", error);
    throw new Error(t("reportService.categoriesError") + error.message);
  }
};

// Function to fetch wallets from the API
const getWallets = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check for user authentication
    if (!user || !user.id) {
      throw new Error(t("reportService.messageNoAuth"));
    }
    // Make request to get wallets
    const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching wallets:", error);
    throw new Error(t("reportService.walletsError") + error.message);
  }
};

// Function to fetch transactions from the API
const getTransactions = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check for user authentication
    if (!user || !user.id) {
      throw new Error(t("reportService.messageNoAuth"));
    }
    // Make request to get transactions
    const response = await AxiosInstance.get(
      `/transactions?user_id=${user.id}`
    );
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching transactions:", error);
    throw new Error(t("reportService.transactionsError") + error.message);
  }
};
// Export functions
export { getCategories, getWallets, getTransactions };
