import { useState, useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
  fetchWallets,
  handleTransfer,
} from "../../services/Transfer/TransferService";
import useCurrency from "../useCurrency";

const useTransferForm = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const currency = useCurrency();

  const [walletList, setWalletList] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedFromWallet, setSelectedFromWallet] = useState(null);
  const [selectedToWallet, setSelectedToWallet] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchWalletsData = useCallback(async () => {
    try {
      const wallets = await fetchWallets(t);
      setWalletList(wallets);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  }, [t]);

  useEffect(() => {
    fetchWalletsData();
  }, [isFocused, fetchWalletsData]);

  const handleTransferPress = async () => {
    const transferAmount = parseFloat(amount);

    if (!selectedFromWallet || !selectedToWallet) {
      setSnackbarMessage(t("transferScreen.selectWallets"));
      setSnackbarVisible(true);
      return;
    }

    if (selectedFromWallet.id === selectedToWallet.id) {
      setSnackbarMessage(t("transferScreen.sameWallets"));
      setSnackbarVisible(true);
      return;
    }

    if (isNaN(transferAmount) || transferAmount <= 0) {
      setSnackbarMessage(t("transferScreen.invalidAmount"));
      setSnackbarVisible(true);
      return;
    }

    try {
      const message = await handleTransfer(
        selectedFromWallet,
        selectedToWallet,
        transferAmount,
        t
      );

      setSnackbarMessage(message);
      setSnackbarVisible(true);

      setAmount("");
      setSelectedFromWallet(null);
      setSelectedToWallet(null);
      fetchWalletsData();
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  const handleFromWalletChange = (walletId) => {
    const wallet = walletList.find((wal) => wal.id === walletId);
    setSelectedFromWallet(wallet);
  };

  const handleToWalletChange = (walletId) => {
    const wallet = walletList.find((wal) => wal.id === walletId);
    setSelectedToWallet(wallet);
  };

  return {
    walletList,
    amount,
    setAmount,
    selectedFromWallet,
    handleFromWalletChange,
    selectedToWallet,
    handleToWalletChange,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    handleTransferPress,
    handleSnackbarDismiss,
    currency,
  };
};

export default useTransferForm;
