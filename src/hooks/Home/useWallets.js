import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

const useWallets = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [walletList, setWalletList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  useEffect(() => {
    fetchWallets();
  }, [isFocused, fetchWallets]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWallets();
  }, [fetchWallets]);

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

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
