import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the add wallet service
import { addWallet } from "../../services/Wallets/WalletService";

// Custom hook to manage add wallet logic
const useAddWallet = () => {
  // Get translation and navigation hooks
  const { t } = useTranslation();
  const navigation = useNavigation();

  // State variables for managing wallet data, snackbar, and more
  const [walletName, setWalletName] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to handle icon selection
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  // Function to handle balance changes (format the input)
  const handleBalanceChange = (text) => {
    let formattedText = text;
    if (formattedText.startsWith("-")) {
      formattedText = "-" + formattedText.slice(1).replace(/-/g, "");
    } else {
      formattedText = formattedText.replace(/-/g, "");
    }
    formattedText = formattedText.replace(/[^0-9.-]/g, "");
    formattedText = formattedText.replace(/(\..*)\./g, "$1");
    const decimalMatch = formattedText.match(/(-?\d+\.\d{0,2})/);
    setBalance(decimalMatch ? decimalMatch[1] : formattedText);
  };

  // Function to handle adding a new wallet
  const handleAddWallet = async () => {
    // If fields are empty show snackbar with error message
    if (!selectedIcon || walletName.trim() === "" || balance.trim() === "") {
      setSnackbarMessage(t("useAddWallet.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      // Create a new wallet using the service
      const newWallet = await addWallet(
        walletName,
        parseFloat(balance),
        selectedIcon,
        t
      );
      // If wallet is created successfully show a snackbar with success message and go back
      if (newWallet) {
        setSnackbarMessage(t("useAddWallet.walletAdded"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        // If creation failed show snackbar with error message
        setSnackbarMessage(t("useAddWallet.walletError"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      // If any error is thrown log it and show snackbar with error message
      console.error("Error creating wallet:", error);
      setSnackbarMessage(t("useAddWallet.addWalletError") + error.message);
      setSnackbarVisible(true);
    }
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the state variables and functions
  return {
    walletName,
    setWalletName,
    balance,
    handleBalanceChange,
    selectedIcon,
    handleIconSelect,
    snackbarVisible,
    snackbarMessage,
    handleAddWallet,
    handleSnackbarDismiss,
  };
};

export default useAddWallet;
