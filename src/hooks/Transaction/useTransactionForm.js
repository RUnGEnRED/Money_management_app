import { useState, useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";
import { createTransaction } from "../../services/Transaction/TransactionService";
import useCurrency from "../useCurrency";

const useTransactionForm = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const currency = useCurrency();

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

  const fetchData = useCallback(async () => {
    try {
      const user = await getAuthToken();
      if (user && user.id) {
        console.log("User token:", user);
        const walletsList = await AxiosInstance.get(
          `/wallets?user_id=${user.id}`
        );
        console.log("Wallets response:", walletsList.data);

        const categoriesList = await AxiosInstance.get(
          `/categories?user_id=${user.id}`
        );
        console.log("Categories response:", categoriesList.data);

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
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("useTransactionForm.errorFetchData"));
      setSnackbarVisible(true);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  const filteredCategories =
    transactionType === "expense" ? categoryExpenseList : categoryIncomeList;

  const handleCategoryChange = (categoryId) => {
    const category = filteredCategories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };

  const handleWalletChange = (walletId) => {
    const wallet = walletList.find((wal) => wal.id === walletId);
    setSelectedWallet(wallet);
  };

  const handleSaveTransaction = async () => {
    if (!amount || !selectedCategory || !selectedWallet) {
      setSnackbarMessage(t("useTransactionForm.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      await createTransaction(
        transactionType,
        parseFloat(amount),
        selectedWallet.id,
        selectedCategory.id,
        date,
        t
      );

      setSnackbarMessage(t("useTransactionForm.success"));
      setSnackbarVisible(true);
      setAmount("");
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  };

  useEffect(() => {
    setSelectedCategory(null);
  }, [transactionType]);

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
