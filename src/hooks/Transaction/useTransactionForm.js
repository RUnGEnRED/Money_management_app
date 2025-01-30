import { useState, useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import API instance, authentication, and transaction services, along with the currency hook
import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";
import { createTransaction } from "../../services/Transaction/TransactionService";
import useCurrency from "../useCurrency";

// Custom hook for managing transaction form data and logic
const useTransactionForm = () => {
  // Get translation function, focus state, and currency format
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const currency = useCurrency();

  // State variables for categories, wallets, form inputs, snackbar, etc.
  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [walletList, setWalletList] = useState([]);

  const [transactionType, setTransactionType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to fetch the necessary data for the transaction form
  const fetchData = useCallback(async () => {
    try {
      // Get the auth token
      const user = await getAuthToken();
      if (user && user.id) {
        console.log("User token:", user);
        // Get the wallets data
        const walletsList = await AxiosInstance.get(
          `/wallets?user_id=${user.id}`
        );
        // Get the categories data
        const categoriesList = await AxiosInstance.get(
          `/categories?user_id=${user.id}`
        );
        // Filter categories by type and set the states
        const expenseCategories = categoriesList.data.filter(
          (category) => category.type === "expense"
        );
        const incomeCategories = categoriesList.data.filter(
          (category) => category.type === "income"
        );

        setWalletList(walletsList.data);
        setCategoryExpenseList(expenseCategories);
        setCategoryIncomeList(incomeCategories);
      }
    } catch (error) {
      // If there was an error, show snackbar with message
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("useTransactionForm.errorFetchData"));
      setSnackbarVisible(true);
    }
  }, [t]);

  // Fetch data when the screen is focused
  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Get the correct list of categories based on the transaction type
  const filteredCategories =
    transactionType === "expense" ? categoryExpenseList : categoryIncomeList;

  // Function to handle category changes
  const handleCategoryChange = (categoryId) => {
    const category = filteredCategories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };
  // Function to handle wallet changes
  const handleWalletChange = (walletId) => {
    const wallet = walletList.find((wal) => wal.id === walletId);
    setSelectedWallet(wallet);
  };

  // Function to handle saving the transaction
  const handleSaveTransaction = async () => {
    if (!amount || !selectedCategory || !selectedWallet) {
      // If fields are empty show snackbar
      setSnackbarMessage(t("useTransactionForm.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      // Create a transaction
      await createTransaction(
        transactionType,
        parseFloat(amount),
        selectedWallet.id,
        selectedCategory.id,
        date,
        t
      );

      // Show success message and clear the amount
      setSnackbarMessage(t("useTransactionForm.success"));
      setSnackbarVisible(true);
      setAmount("");
    } catch (error) {
      // Handle errors
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  };

  // Clear the category selection when transaction type changes
  useEffect(() => {
    setSelectedCategory(null);
  }, [transactionType]);

  // Return the form data and related functions
  return {
    transactionType,
    setTransactionType,
    amount,
    setAmount,
    date,
    setDate,
    selectedCategory,
    handleCategoryChange,
    selectedWallet,
    handleWalletChange,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    handleSnackbarDismiss,
    filteredCategories,
    walletList,
    handleSaveTransaction,
    currency,
  };
};

export default useTransactionForm;
