import axios from "../api/AxiosInstance";
import { getAuthToken } from "./Auth/AuthService";

export const fetchWallets = async () => {
  try {
    const user = await getAuthToken();
    if (user && user.id) {
      const response = await axios.get(`/wallets?user_id=${user.id}`);
      return response.data;
    }
  } catch (error) {
    throw new Error("Error fetching wallets");
  }
};

export const handleTransfer = async (
  fromWallet,
  toWallet,
  transferAmount,
  date
) => {
  try {
    if (fromWallet.balance < transferAmount) {
      throw new Error("Insufficient funds");
    }
    await axios.put(`/wallets/${fromWallet.id}`, {
      ...fromWallet,
      balance: fromWallet.balance - transferAmount,
    });

    await axios.put(`/wallets/${toWallet.id}`, {
      ...toWallet,
      balance: toWallet.balance + transferAmount,
    });

    await axios.post(`/transactions`, {
      amount: transferAmount,
      wallet_id: fromWallet.id,
      date,
      type: "expense",
    });

    await axios.post(`/transactions`, {
      amount: transferAmount,
      wallet_id: toWallet.id,
      date,
      type: "income",
    });

    return "Transfer successful";
  } catch (error) {
    throw new Error(error.response?.data?.message || "Transfer failed");
  }
};
