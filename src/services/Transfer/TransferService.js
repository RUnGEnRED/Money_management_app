import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

const fetchWallets = async (t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error("User is not authenticated or invalid token.");
    }

    const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw new Error(t("transferService.errorFetchWallets"));
  }
};

const handleTransfer = async (fromWallet, toWallet, amount, t) => {
  try {
    if (fromWallet.balance < amount) {
      throw new Error(t("transferService.notEnoughFunds"));
    }
    const transferData = {
      amount: amount,
      fromWalletId: fromWallet.id,
      toWalletId: toWallet.id,
    };

    const updatedWallets = await transferFunds(transferData, t);
    return t("transferService.transferSuccess");
  } catch (error) {
    throw new Error(error.message);
  }
};

const transferFunds = async (transferData, t) => {
  try {
    const { fromWalletId, toWalletId, amount } = transferData;

    const fromWalletResponse = await AxiosInstance.get(
      `/wallets/${fromWalletId}`
    );

    const fromWallet = fromWalletResponse.data;

    const toWalletResponse = await AxiosInstance.get(`/wallets/${toWalletId}`);
    const toWallet = toWalletResponse.data;

    const newFromWalletBalance = fromWallet.balance - amount;
    const newToWalletBalance = toWallet.balance + amount;

    await AxiosInstance.put(`/wallets/${fromWalletId}`, {
      ...fromWallet,
      balance: newFromWalletBalance,
    });

    await AxiosInstance.put(`/wallets/${toWalletId}`, {
      ...toWallet,
      balance: newToWalletBalance,
    });

    return {
      success: true,
      data: { newFromWalletBalance, newToWalletBalance },
    };
  } catch (error) {
    throw new Error(t("transferService.transferFailed"));
  }
};

export { fetchWallets, handleTransfer };
