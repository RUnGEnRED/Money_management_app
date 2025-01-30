import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the update wallet service
import { updateWallet } from "../../services/Wallets/WalletService";

// Custom hook for managing edit wallet logic
const useEditWallet = () => {
  // Get translation, navigation and route hooks
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  // Get route parameters
  const { walletId, walletName, walletBalance, iconName } = route.params;

  // State variables for managing edit form data, snackbar, loading and more
  const [selectedIcon, setSelectedIcon] = useState(iconName);
  const [walletNameInput, setWalletNameInput] = useState(walletName);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // set the state for the edit screen, when it mounts
  useEffect(() => {
    setSelectedIcon(iconName);
    setWalletNameInput(walletName);
  }, [walletName, iconName]);

  // Function to handle the icon selection
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  // Function to handle saving the edited wallet
  const saveWallet = async () => {
    // If fields are empty, show snackbar with error message
    if (!selectedIcon || walletNameInput.trim() === "") {
      setSnackbarMessage(t("useEditWallet.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      // Update the wallet using the service
      const updatedWallet = await updateWallet(
        walletId,
        walletNameInput,
        walletBalance,
        selectedIcon,
        t
      );
      // If update is successfull show a snackbar with success message and go back
      if (updatedWallet) {
        setSnackbarMessage(t("useEditWallet.walletUpdated"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        // If update fails show a snackbar with error message
        setSnackbarMessage(t("useEditWallet.updateWalletFailed"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      // If any errors occur log it and show snackbar with error message
      console.error("Error updating wallet:", error);
      setSnackbarMessage(t("useEditWallet.updateWalletError") + error.message);
      setSnackbarVisible(true);
    }
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the state variables and functions
  return {
    selectedIcon,
    handleIconSelect,
    walletNameInput,
    setWalletNameInput,
    snackbarVisible,
    snackbarMessage,
    saveWallet,
    handleSnackbarDismiss,
  };
};

export default useEditWallet;
