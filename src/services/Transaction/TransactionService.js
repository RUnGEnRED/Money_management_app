import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";
import { addTransactionToCalendar } from "./CalendarService";

const createTransaction = async (
  transactionType,
  amount,
  wallet_id,
  category_id,
  date,
  t
) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("transactionService.messageNoAuth"));
    }

    const transactionData = {
      type: transactionType,
      amount: parseFloat(amount),
      wallet_id: wallet_id,
      categorie_id: category_id,
      user_id: user.id,
      date: date.toISOString(),
    };

    const response = await axios.post("/transactions", transactionData);

    await updateWalletBalance(
      wallet_id,
      parseFloat(amount),
      transactionType,
      t
    );

    await addTransactionToCalendar(transactionData, t);

    return { sucessfull: true, data: response.data };
  } catch (error) {
    throw new Error(
      t("transactionScreen.createTransactionError") + error.message
    );
  }
};

const updateWalletBalance = async (wallet_id, amount, transactionType, t) => {
  try {
    const walletResponse = await axios.get(`/wallets/${wallet_id}`);
    const wallet = walletResponse.data;

    let newBalance;
    if (transactionType === "income") {
      newBalance = wallet.balance + amount;
    } else if (transactionType === "expense") {
      newBalance = wallet.balance - amount;
    }

    await axios.put(`/wallets/${wallet_id}`, {
      ...wallet,
      balance: newBalance,
    });

    return newBalance;
  } catch (error) {
    console.error("Wallet update error: ", error);
    throw new Error(t("transactionScreen.walletUpdateError"));
  }
};

export { createTransaction };
