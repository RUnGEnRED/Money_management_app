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

const handleTransfer = async (fromWallet, toWallet, amount, t) => {
  try {
    // Make a call to get data from fromWallet
    const fromWalletResponse = await AxiosInstance.get(
      `/wallets/${fromWallet.id}`
    );
    const fromWalletData = fromWalletResponse.data;

    // Make a call to get data from toWallet
    const toWalletResponse = await AxiosInstance.get(`/wallets/${toWallet.id}`);
    const toWalletData = toWalletResponse.data;

    // Calculate the new balances
    const newFromWalletBalance =
      parseFloat(fromWalletData.balance) - parseFloat(amount);
    const newToWalletBalance =
      parseFloat(toWalletData.balance) + parseFloat(amount);

    // Update from wallet with the new balance
    await AxiosInstance.put(`/wallets/${fromWallet.id}`, {
      ...fromWalletData,
      balance: newFromWalletBalance.toFixed(2),
    });
    // Update to wallet with the new balance
    await AxiosInstance.put(`/wallets/${toWallet.id}`, {
      ...toWalletData,
      balance: newToWalletBalance.toFixed(2),
    });

    // Return success message if transfer successfull
    return t("transferService.transferSuccess");
  } catch (error) {
    // Throw the error if transfer failed
    console.error("Error handling transfer:", error);
    throw new Error(t("transferService.transferFailed"));
  }
};

// Export the functions
export { fetchWallets, handleTransfer };
