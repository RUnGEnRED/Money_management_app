// Import axios instance and the authentication token service
import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

// Function to fetch categories from the API
const getCategories = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }
    // Make API request to get the categories
    const response = await AxiosInstance.get(`/categories?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    // If there is any error, log it and throw a new error with a message
    console.error("Error fetching categories:", error);
    throw new Error(t("historyService.categoriesError") + error.message);
  }
};

// Function to fetch wallets from the API
const getWallets = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }
    // Make API request to get wallets
    const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    // If there is any error, log it and throw a new error with a message
    console.error("Error fetching wallets:", error);
    throw new Error(t("historyService.walletsError") + error.message);
  }
};

// Function to fetch transactions from the API
const getTransactions = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }
    // Make API request to get transactions
    const response = await AxiosInstance.get(
      `/transactions?user_id=${user.id}`
    );
    return response.data;
  } catch (error) {
    // If there is any error, log it and throw a new error with a message
    console.error("Error fetching transactions:", error);
    throw new Error(t("historyService.transactionsError") + error.message);
  }
};

// Function to delete a transaction from the API
const deleteTransaction = async (id, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }
    // Make API request to delete a transaction
    await AxiosInstance.delete(`/transactions/${id}`);
  } catch (error) {
    // If there is any error, log it and throw a new error with a message
    console.error("Error deleting transaction:", error);
    throw new Error(t("historyService.deleteTransactionError") + error.message);
  }
};

// Export the functions
export { getCategories, getWallets, getTransactions, deleteTransaction };
