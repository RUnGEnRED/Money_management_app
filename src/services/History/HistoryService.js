import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

const getCategories = async (t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }

    const response = await AxiosInstance.get(`/categories?user_id=${user.id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(t("historyService.categoriesError") + error.message);
  }
};

const getWallets = async (t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }
    const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw new Error(t("historyService.walletsError") + error.message);
  }
};

const getTransactions = async (t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }

    const response = await AxiosInstance.get(
      `/transactions?user_id=${user.id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(t("historyService.transactionsError") + error.message);
  }
};

const deleteTransaction = async (id, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("historyService.messageNoAuth"));
    }
    await AxiosInstance.delete(`/transactions/${id}`);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error(t("historyService.deleteTransactionError") + error.message);
  }
};

export { getCategories, getWallets, getTransactions, deleteTransaction };
