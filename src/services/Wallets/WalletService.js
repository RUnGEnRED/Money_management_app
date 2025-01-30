// Import axios instance and the authentication token service
import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

// Function to fetch wallets from the API
const getWallets = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    // Make the API call to get wallets
    const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    // If any error occurs log it and throw new error.
    console.error("Error fetching wallets:", error);
    throw new Error(t("walletService.errorFetchWallets") + error.message);
  }
};

// Function to delete a wallet from the API
const deleteWallet = async (id, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    // Make an API call to delete the wallet
    await AxiosInstance.delete(`/wallets/${id}`, {
      params: { user_id: user.id },
    });
    // Delete transactions from that wallet
    await deleteTransactionsByWalletId(id, t);
  } catch (error) {
    // If any error occurs log it and throw a new error
    console.error("Error deleting wallet:", error);
    throw new Error(t("walletService.deleteWalletError") + error.message);
  }
};

// Function to delete transactions of a certain wallet id from the API
const deleteTransactionsByWalletId = async (walletId, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    // Make the api call to get transactions from a specific wallet
    const response = await AxiosInstance.get(
      `/transactions?user_id=${user.id}&wallet_id=${walletId}`
    );
    const transactions = response.data;
    // Loop through the transactions and delete them
    for (const transaction of transactions) {
      await AxiosInstance.delete(`/transactions/${transaction.id}`, {
        params: { user_id: user.id },
      });
    }
  } catch (error) {
    // If any errors occur log it and throw a new error
    console.error("Error deleting transactions by wallet:", error);
    throw new Error(t("walletService.deleteTransactionsError") + error.message);
  }
};

// Function to update a wallet using the API
const updateWallet = async (id, name, balance, icon, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    // Prepare the wallet data
    const walletData = {
      name: name,
      balance: balance,
      icon: icon,
      user_id: user.id,
    };
    // Make the api call to update the wallet data
    const response = await AxiosInstance.put(`/wallets/${id}`, walletData);
    return response.data;
  } catch (error) {
    // If any errors occur log it and throw new error
    console.error("Error updating wallet:", error);
    throw new Error(t("walletService.updateWalletError") + error.message);
  }
};

// Function to add a new wallet to the API
const addWallet = async (name, balance, icon, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    // Prepare wallet data
    const walletData = {
      name: name,
      balance: balance,
      icon: icon,
      user_id: user.id,
    };
    // Make the API call to create a wallet
    const response = await AxiosInstance.post(`/wallets`, walletData);
    return response.data;
  } catch (error) {
    // If any errors occur log it and throw new error
    console.error("Error creating wallet:", error);
    throw new Error(t("walletService.addWalletError") + error.message);
  }
};
// Export the functions
export {
  getWallets,
  deleteWallet,
  deleteTransactionsByWalletId,
  updateWallet,
  addWallet,
};
