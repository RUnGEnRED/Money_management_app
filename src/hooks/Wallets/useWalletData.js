import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

// Import the wallet service
import { getWallets, deleteWallet } from "../../services/Wallets/WalletService";

// Custom hook for managing wallet data and logic
const useWalletData = () => {
  // Get translation, focus and navigation hooks
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // State variables for managing wallet data, snackbar, loading and more
  const [walletList, setWalletList] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch wallet data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Get wallet data from the service
      const wallets = await getWallets(t);
      // Set wallet data to the state variable
      setWalletList(wallets);
    } catch (error) {
      // Log error and show snackbar with error message
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("useWalletData.errorFetchWallets"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  // Fetch data when the screen is focused
  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused, fetchData]);

  // Function to handle refreshing the data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // Function to handle deleting a wallet
  const handleDeleteWallet = async (id) => {
    try {
      // Delete wallet using the service
      await deleteWallet(id, t);
      // Set snackbar with success message and filter from wallet list
      setSnackbarMessage(t("useWalletData.walletDeleted"));
      setSnackbarVisible(true);
      setWalletList((prev) => prev.filter((wallet) => wallet.id !== id));
    } catch (error) {
      // If any error is caught log it and show snackbar with error message
      console.error("Error deleting wallet:", error);
      setSnackbarMessage(t("useWalletData.deleteFailed"));
      setSnackbarVisible(true);
    }
  };

  // Function to handle navigating to edit wallet
  const handleEditWallet = (wallet) => {
    navigation.navigate("Edit Wallet", {
      walletId: wallet.id,
      walletName: wallet.name,
      walletBalance: wallet.balance,
      iconName: wallet.icon,
    });
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the state variables and functions
  return {
    walletList,
    loading,
    refreshing,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    onRefresh,
    deleteWallet: handleDeleteWallet,
    handleEditWallet,
    handleSnackbarDismiss,
  };
};

export default useWalletData;
