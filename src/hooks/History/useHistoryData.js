import { useState, useEffect, useCallback, useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import services to get data and delete transaction
import {
  getCategories,
  getWallets,
  getTransactions,
  deleteTransaction,
} from "../../services/History/HistoryService";

// Custom hook to manage history data and logic
const useHistoryData = () => {
  // Get translation, focus hook
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  // State variables for managing data, snackbar, loading, and more
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // State variables for the date pickers
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    return lastMonth;
  });

  // Function to format the date into a string
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to fetch necessary data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Get categories, transactions, wallets using a promise all
      const [categoriesData, transactionsData, walletsData] = await Promise.all(
        [getCategories(t), getTransactions(t), getWallets(t)]
      );
      // Map transactions to add category, wallet and formatted date
      const mergedTransactions = transactionsData.map((t) => {
        const category = categoriesData.find((c) => c.id === t.categorie_id);
        const wallet = walletsData.find((w) => w.id === t.wallet_id);
        const transactionDate = new Date(t.date);

        return {
          ...t,
          category,
          wallet,
          originalDate: transactionDate,
          date: formatDate(transactionDate),
          amount: t.type === "expense" ? -t.amount : t.amount,
        };
      });
      // Set the data using state variables
      setCategories(categoriesData);
      setTransactions(mergedTransactions);
      setWallets(walletsData);
    } catch (error) {
      // If any errors occur, show snackbar with error message
      setSnackbarMessage(t("useHistoryData.errorFetchData"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);
  // Fetch data if the screen is focused
  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused, fetchData]);

  // Function to refresh data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // Function to filter the transactions based on date and category
  const filteredTransactions = useMemo(() => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    let filtered = transactions.filter((t) => {
      return t.originalDate >= start && t.originalDate <= end;
    });

    if (selectedCategory) {
      filtered = filtered.filter(
        (t) => t.category?.id === selectedCategory?.id
      );
    }
    // Sort by most recent date
    return filtered.sort((a, b) => b.originalDate - a.originalDate);
  }, [transactions, startDate, endDate, selectedCategory]);

  // Function to handle deleting a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id, t);
      setTransactions(transactions.filter((t) => t.id !== id));
      setSnackbarMessage(t("useHistoryData.transactionDeleted"));
      setSnackbarVisible(true);
    } catch (error) {
      setSnackbarMessage(t("useHistoryData.errorDeletingTransaction"));
      setSnackbarVisible(true);
    }
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Function to handle category changes
  const handleCategoryChange = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };

  // Return the state variables and functions
  return {
    categories,
    transactions,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCategory,
    handleCategoryChange,
    snackbarVisible,
    setSnackbarVisible,
    snackbarMessage,
    loading,
    refreshing,
    onRefresh,
    filteredTransactions,
    handleDeleteTransaction,
    handleSnackbarDismiss,
  };
};

export default useHistoryData;
