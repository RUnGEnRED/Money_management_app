import { useState, useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the transfer services and the custom currency hook
import {
  fetchWallets,
  handleTransfer,
} from "../../services/Transfer/TransferService";
import useCurrency from "../useCurrency";

// Custom hook for managing transfer form data and logic
const useTransferForm = () => {
  // Get translation, focus state, and currency format
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const currency = useCurrency();

  // State variables for managing wallet data, form inputs, and snackbar
  const [walletList, setWalletList] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedFromWallet, setSelectedFromWallet] = useState(null);
  const [selectedToWallet, setSelectedToWallet] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to fetch wallets
  const fetchWalletsData = useCallback(async () => {
    try {
      // Get wallets from the service
      const wallets = await fetchWallets(t);
      setWalletList(wallets);
    } catch (error) {
      // If any errors are caught show snackbar with error message
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  }, [t]);

  // Fetch wallet data when screen is focused
  useEffect(() => {
    fetchWalletsData();
  }, [isFocused, fetchWalletsData]);

  // Function to handle the transfer
  const handleTransferPress = async () => {
    const transferAmount = parseFloat(amount);

    // If no wallets are selected, show error message using snackbar
    if (!selectedFromWallet || !selectedToWallet) {
      setSnackbarMessage(t("transferScreen.selectWallets"));
      setSnackbarVisible(true);
      return;
    }
    // If wallets are the same, show error message using snackbar
    if (selectedFromWallet.id === selectedToWallet.id) {
      setSnackbarMessage(t("transferScreen.sameWallets"));
      setSnackbarVisible(true);
      return;
    }
    // If amount is invalid show snackbar with error message
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setSnackbarMessage(t("transferScreen.invalidAmount"));
      setSnackbarVisible(true);
      return;
    }

    try {
      // Transfer funds
      const message = await handleTransfer(
        selectedFromWallet,
        selectedToWallet,
        transferAmount,
        t
      );
      // If succesful show snackbar with success message and reset values
      setSnackbarMessage(message);
      setSnackbarVisible(true);

      setAmount("");
      setSelectedFromWallet(null);
      setSelectedToWallet(null);
      // Refresh the wallet data
      fetchWalletsData();
    } catch (error) {
      // If any error happens show a snackbar with error message
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Function to handle the wallet changes for the from wallet
  const handleFromWalletChange = (walletId) => {
    const wallet = walletList.find((wal) => wal.id === walletId);
    setSelectedFromWallet(wallet);
  };

  // Function to handle the wallet changes for the to wallet
  const handleToWalletChange = (walletId) => {
    const wallet = walletList.find((wal) => wal.id === walletId);
    setSelectedToWallet(wallet);
  };

  // Return the state variables and functions
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
