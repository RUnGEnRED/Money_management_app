import axios from "../api/AxiosInstance";
import { getAuthToken } from "./Auth/AuthService";

export const createTransaction = async (
  amount,
  wallet_id,
  category_id,
  transactionType,
  date
) => {
  try {
    const user = await getAuthToken();
    if (user && user.id) {
      const transactionData = {
        amount,
        wallet_id,
        category_id,
        type: transactionType,
        date: date.toISOString(),
        user_id: user.id,
      };

      const response = await axios.post("/transactions", transactionData);
      const transaction = response.data;

      await updateWalletBalance(wallet_id, amount, transactionType);

      return "Transakcja została zapisana.";
    } else {
      throw new Error("Brak autentykacji użytkownika.");
    }
  } catch (error) {
    throw new Error("Błąd przy tworzeniu transakcji: " + error.message);
  }
};

const updateWalletBalance = async (wallet_id, amount, type) => {
  try {
    const walletResponse = await axios.get(`/wallets/${wallet_id}`);
    const wallet = walletResponse.data;

    let newBalance;
    if (type === "income") {
      newBalance = wallet.balance + amount;
    } else if (type === "expense") {
      if (wallet.balance < amount) {
        throw new Error("Niewystarczające środki na koncie.");
      }
      newBalance = wallet.balance - amount;
    }

    await axios.put(`/wallets/${wallet_id}`, {
      ...wallet,
      balance: newBalance,
    });

    return newBalance;
  } catch (error) {
    console.error("Błąd przy aktualizacji salda portfela: ", error);
    throw new Error("Błąd przy aktualizacji salda portfela.");
  }
};
