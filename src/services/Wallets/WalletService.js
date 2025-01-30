import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

const getWallets = async (t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }

    const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw new Error(t("walletService.errorFetchWallets") + error.message);
  }
};

const deleteWallet = async (id, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    await AxiosInstance.delete(`/wallets/${id}`, {
      params: { user_id: user.id },
    });
    await deleteTransactionsByWalletId(id, t);
  } catch (error) {
    console.error("Error deleting wallet:", error);
    throw new Error(t("walletService.deleteWalletError") + error.message);
  }
};

const deleteTransactionsByWalletId = async (walletId, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    const response = await AxiosInstance.get(
      `/transactions?user_id=${user.id}&wallet_id=${walletId}`
    );
    const transactions = response.data;

    for (const transaction of transactions) {
      await AxiosInstance.delete(`/transactions/${transaction.id}`, {
        params: { user_id: user.id },
      });
    }
  } catch (error) {
    console.error("Error deleting transactions by wallet:", error);
    throw new Error(t("walletService.deleteTransactionsError") + error.message);
  }
};

const updateWallet = async (id, name, balance, icon, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }
    const walletData = {
      name: name,
      balance: balance,
      icon: icon,
      user_id: user.id,
    };
    const response = await AxiosInstance.put(`/wallets/${id}`, walletData);
    return response.data;
  } catch (error) {
    console.error("Error updating wallet:", error);
    throw new Error(t("walletService.updateWalletError") + error.message);
  }
};

const addWallet = async (name, balance, icon, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("walletService.messageNoAuth"));
    }

    const walletData = {
      name: name,
      balance: balance,
      icon: icon,
      user_id: user.id,
    };

    const response = await AxiosInstance.post(`/wallets`, walletData);
    return response.data;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw new Error(t("walletService.addWalletError") + error.message);
  }
};

export {
  getWallets,
  deleteWallet,
  deleteTransactionsByWalletId,
  updateWallet,
  addWallet,
};
