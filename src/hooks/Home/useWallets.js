import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the API instance and authentication service
import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

// Custom hook for managing wallet data
const useWallets = () => {
  // Get translation function and focus state
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  // State variables for managing wallet data, loading, refreshing, and snackbar
  const [walletList, setWalletList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to fetch wallet data from the API
  const fetchWallets = useCallback(async () => {
    setLoading(true);

    try {
      const user = await getAuthToken();
      if (user && user.id) {
        const response = await AxiosInstance.get(`/wallets?user_id=${user.id}`);
        console.log("Wallets response: ", response.data);
        setWalletList(response.data);
      }
    } catch (error) {
      console.error("Wallets fetch error: ", error);
      setSnackbarMessage(t("homeScreen.errorFetchWallets"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  // Fetch wallets when the screen is focused
  useEffect(() => {
    fetchWallets();
  }, [isFocused, fetchWallets]);

  // Function to handle refreshing the wallet list
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWallets();
  }, [fetchWallets]);

  // Function to dismiss the snackbar
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the wallet data and related functions
  return {
    walletList,
    loading,
    refreshing,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    onRefresh,
    handleSnackbarDismiss,
  };
};

export default useWallets;
