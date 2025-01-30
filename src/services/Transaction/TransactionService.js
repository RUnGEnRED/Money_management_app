// Import necessary dependencies
import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";
import { addTransactionToCalendar } from "./CalendarService";

// Function to create a new transaction
const createTransaction = async (
  transactionType,
  amount,
  wallet_id,
  category_id,
  date,
  t
) => {
  try {
    // Get the user's authentication token
    const user = await getAuthToken();
    // Check if the user is authenticated
    if (!user || !user.id) {
      throw new Error(t("transactionService.messageNoAuth"));
    }
    // Prepare the transaction data
    const transactionData = {
      type: transactionType,
      amount: parseFloat(amount),
      wallet_id: wallet_id,
      categorie_id: category_id,
      user_id: user.id,
      date: date.toISOString(),
    };
    // Make the API call to create the transaction
    const response = await axios.post("/transactions", transactionData);
    // Update the wallet balance after the transaction
    await updateWalletBalance(
      wallet_id,
      parseFloat(amount),
      transactionType,
      t
    );
    // Add the transaction to the calendar
    await addTransactionToCalendar(transactionData, t);
    // Return the success response
    return { sucessfull: true, data: response.data };
  } catch (error) {
    // Handle errors
    throw new Error(
      t("transactionScreen.createTransactionError") + error.message
    );
  }
};

// Function to update the wallet balance after a transaction
const updateWalletBalance = async (wallet_id, amount, transactionType, t) => {
  try {
    // Get the wallet information
    const walletResponse = await axios.get(`/wallets/${wallet_id}`);
    const wallet = walletResponse.data;
    // Calculate the new balance
    let newBalance;
    if (transactionType === "income") {
      newBalance = wallet.balance + amount;
    } else if (transactionType === "expense") {
      newBalance = wallet.balance - amount;
    }
    // Make the API call to update wallet
    await axios.put(`/wallets/${wallet_id}`, {
      ...wallet,
      balance: newBalance,
    });
    // Return the success response
    return { sucessfull: true, data: newBalance };
  } catch (error) {
    // Handle errors
    console.error("Wallet update error: ", error);
    throw new Error(t("transactionScreen.walletUpdateError"));
  }
};

// Export the createTransaction function
export { createTransaction };
