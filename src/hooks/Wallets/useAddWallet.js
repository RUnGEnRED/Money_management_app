import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { addWallet } from "../../services/Wallets/WalletService";

const useAddWallet = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [walletName, setWalletName] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const handleAddWallet = async () => {
    if (!selectedIcon || walletName.trim() === "" || balance.trim() === "") {
      setSnackbarMessage(t("useAddWallet.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      const newWallet = await addWallet(
        walletName,
        parseFloat(balance),
        selectedIcon,
        t
      );
      if (newWallet) {
        setSnackbarMessage(t("useAddWallet.walletAdded"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        setSnackbarMessage(t("useAddWallet.walletError"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
      setSnackbarMessage(t("useAddWallet.addWalletError") + error.message);
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return {
    walletName,
    setWalletName,
    balance,
    setBalance,
    selectedIcon,
    handleIconSelect,
    snackbarVisible,
    snackbarMessage,
    handleAddWallet,
    handleSnackbarDismiss,
  };
};

export default useAddWallet;
