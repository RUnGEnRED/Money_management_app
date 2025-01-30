// Import axios instance and auth token service
import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

// Function to fetch wallets from the API
const fetchWallets = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("transferService.messageNoAuth"));
    }
    // Make an API call to get the wallets
    const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    // If there is any error, log it and throw a new error
    console.error("Error fetching wallets:", error);
    throw new Error(t("transferService.errorFetchWallets"));
  }
};

// Function to handle transfer of funds
const handleTransfer = async (fromWallet, toWallet, amount, t) => {
  try {
    // Check if there is enough funds in the fromWallet
    if (fromWallet.balance < amount) {
      throw new Error(t("transferService.notEnoughFunds"));
    }
    // Set transfer data
    const transferData = {
      amount: amount,
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
    };
    // Call transfer funds with the transfer data
    const updatedWallets = await transferFunds(transferData, t);
    // If succesfull return success message
    return t("transferService.transferSuccess");
  } catch (error) {
    // Throw the error
    throw new Error(error.message);
  }
};

// Function to transfer funds from one wallet to another
const transferFunds = async (transferData, t) => {
  try {
    // Get the data from transfer data
    const { fromWalletId, toWalletId, amount } = transferData;
    // Make a call to get data from fromWallet
    const fromWalletResponse = await AxiosInstance.get(
      `/wallets/${fromWalletId}`
    );

    const fromWallet = fromWalletResponse.data;
    // Make a call to get data from toWallet
    const toWalletResponse = await AxiosInstance.get(`/wallets/${toWalletId}`);
    const toWallet = toWalletResponse.data;
    // Calculate the new balances
    const newFromWalletBalance = parseFloat(
      (fromWallet.balance - amount).toFixed(2)
    );
    const newToWalletBalance = parseFloat(
      (toWallet.balance + amount).toFixed(2)
    );
    // Update from wallet with the new balance
    await AxiosInstance.put(`/wallets/${fromWalletId}`, {
      ...fromWallet,
      balance: newFromWalletBalance,
    });
    // Update to wallet with the new balance
    await AxiosInstance.put(`/wallets/${toWalletId}`, {
      ...toWallet,
      balance: newToWalletBalance,
    });
    // Return success status and the updated wallets
    return {
      success: true,
      data: { newFromWalletBalance, newToWalletBalance },
    };
  } catch (error) {
    // Throw the error
    throw new Error(t("transferService.transferFailed"));
  }
};

// Export the functions
export { fetchWallets, handleTransfer };
