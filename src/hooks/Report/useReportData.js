import { useState, useEffect, useCallback, useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import services to get report data
import {
  getCategories,
  getWallets,
  getTransactions,
} from "../../services/Report/ReportService";

// Define the color palette and max categories
const COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#556270", // Charcoal
  "#C7F464", // Lime
  "#81D8D0", // Light Sea Green
];
const MAX_CATEGORIES = 5;

// Custom hook for managing report data and logic
const useReportData = () => {
  // Get translation and isFocused hook
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  // State variables for managing data, snackbar, loading, and more
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
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

  // Function to fetch necessary report data
  const fetchReportData = useCallback(async () => {
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
          amount: t.type === "expense" ? -t.amount : t.amount,
        };
      });
      // Set the data in the state variables
      setCategories(categoriesData);
      setTransactions(mergedTransactions);
      setWallets(walletsData);
    } catch (error) {
      // If there is an error fetchin the data, show a snackbar with an error message.
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("useReportData.errorFetchData"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);
  // Fetch data when the screen is focused
  useEffect(() => {
    if (isFocused) fetchReportData();
  }, [isFocused, fetchReportData]);
  // Function to handle refreshing the data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReportData();
  }, [fetchReportData]);

  // Function to filter the transactions based on date and selected wallet
  const filteredTransactions = useMemo(() => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    let filtered = transactions.filter((t) => {
      return t.originalDate >= start && t.originalDate <= end;
    });

    if (selectedWallet) {
      filtered = filtered.filter((t) => t.wallet?.id === selectedWallet.id);
    }
    return filtered;
  }, [transactions, startDate, endDate, selectedWallet]);

  // Function to calculate the income data for the pie chart
  const incomeData = useMemo(() => {
    const incomeCategoriesMap = new Map();

    filteredTransactions
      .filter((t) => t.amount > 0)
      .forEach((t) => {
        const categoryName = t.category?.name || t("general.unknown");
        const categoryBalance = t.amount;
        if (incomeCategoriesMap.has(categoryName)) {
          incomeCategoriesMap.set(
            categoryName,
            incomeCategoriesMap.get(categoryName) + categoryBalance
          );
        } else {
          incomeCategoriesMap.set(categoryName, categoryBalance);
        }
      });

    const totalIncome = filteredTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const sortedCategories = Array.from(incomeCategoriesMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, MAX_CATEGORIES);

    return sortedCategories.map(([name, balance], index) => ({
      name,
      percent: (balance / totalIncome) * 100 || 0,
      balance,
      color: COLORS[index % COLORS.length],
    }));
  }, [filteredTransactions, t]);

  // Function to calculate the expense data for the pie chart
  const expenseData = useMemo(() => {
    const expenseCategoriesMap = new Map();

    filteredTransactions
      .filter((t) => t.amount < 0)
      .forEach((t) => {
        const categoryName = t.category?.name || t("general.unknown");
        const categoryBalance = t.amount;
        if (expenseCategoriesMap.has(categoryName)) {
          expenseCategoriesMap.set(
            categoryName,
            expenseCategoriesMap.get(categoryName) + categoryBalance
          );
        } else {
          expenseCategoriesMap.set(categoryName, categoryBalance);
        }
      });

    const totalExpenses = filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const sortedCategories = Array.from(expenseCategoriesMap)
      .sort(([, a], [, b]) => a - b)
      .slice(0, MAX_CATEGORIES);

    return sortedCategories.map(([name, balance], index) => ({
      name,
      percent: (Math.abs(balance) / Math.abs(totalExpenses)) * 100 || 0,
      balance,
      color: COLORS[index % COLORS.length],
    }));
  }, [filteredTransactions, t]);

  // Function to calculate total income
  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [filteredTransactions]);

  // Function to calculate total expenses
  const totalExpenses = useMemo(() => {
    return Math.abs(
      filteredTransactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );
  }, [filteredTransactions]);

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Function to handle wallet changes
  const handleWalletChange = (walletId) => {
    const wallet = wallets.find((wal) => wal.id === walletId);
    setSelectedWallet(wallet);
  };

  // Return the state variables and functions
  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedWallet,
    handleWalletChange,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    loading,
    refreshing,
    onRefresh,
    incomeData,
    expenseData,
    totalIncome,
    totalExpenses,
    wallets,
    handleSnackbarDismiss,
  };
};

export default useReportData;
