import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { getWallets, deleteWallet } from "../../services/Wallets/WalletService";

const useWalletData = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [walletList, setWalletList] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const wallets = await getWallets(t);
      setWalletList(wallets);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("useWalletData.errorFetchWallets"));
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

  const handleDeleteWallet = async (id) => {
    try {
      await deleteWallet(id, t);
      setSnackbarMessage(t("useWalletData.walletDeleted"));
      setSnackbarVisible(true);
      setWalletList((prev) => prev.filter((wallet) => wallet.id !== id));
    } catch (error) {
      console.error("Error deleting wallet:", error);
      setSnackbarMessage(t("useWalletData.deleteFailed"));
      setSnackbarVisible(true);
    }
  };

  const handleEditWallet = (wallet) => {
    navigation.navigate("Edit Wallet", {
      walletId: wallet.id,
      walletName: wallet.name,
      walletBalance: wallet.balance,
      iconName: wallet.icon,
    });
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

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
