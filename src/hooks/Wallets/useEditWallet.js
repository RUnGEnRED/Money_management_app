import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { updateWallet } from "../../services/Wallets/WalletService";

const useEditWallet = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const { walletId, walletName, walletBalance, iconName } = route.params;

  const [selectedIcon, setSelectedIcon] = useState(iconName);
  const [walletNameInput, setWalletNameInput] = useState(walletName);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setSelectedIcon(iconName);
    setWalletNameInput(walletName);
  }, [walletName, iconName]);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const saveWallet = async () => {
    if (!selectedIcon || walletNameInput.trim() === "") {
      setSnackbarMessage(t("useEditWallet.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      const updatedWallet = await updateWallet(
        walletId,
        walletNameInput,
        walletBalance,
        selectedIcon,
        t
      );
      if (updatedWallet) {
        setSnackbarMessage(t("useEditWallet.walletUpdated"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        setSnackbarMessage(t("useEditWallet.updateWalletFailed"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Error updating wallet:", error);
      setSnackbarMessage(t("useEditWallet.updateWalletError") + error.message);
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

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
