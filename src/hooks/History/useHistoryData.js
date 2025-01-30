import { useState, useEffect, useCallback, useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  getCategories,
  getWallets,
  getTransactions,
  deleteTransaction,
} from "../../services/History/HistoryService";

const useHistoryData = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    return lastMonth;
  });

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [categoriesData, transactionsData, walletsData] = await Promise.all(
        [getCategories(t), getTransactions(t), getWallets(t)]
      );

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

      setCategories(categoriesData);
      setTransactions(mergedTransactions);
      setWallets(walletsData);
    } catch (error) {
      setSnackbarMessage(t("useHistoryData.errorFetchData"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused, fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

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

    return filtered.sort((a, b) => b.originalDate - a.originalDate);
  }, [transactions, startDate, endDate, selectedCategory]);

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

  const handleSnackbarDismiss = () => setSnackbarVisible(false);
  const handleCategoryChange = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
  };

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
