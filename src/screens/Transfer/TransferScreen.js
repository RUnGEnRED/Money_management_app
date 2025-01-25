import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import Keypad from "../../components/Keypad";
import DropdownInput from "../../components/DropdownInput";
import { fetchWallets, handleTransfer } from "../../services/TransferService";

const TransferScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [walletList, setWalletList] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [selectedFromWallet, setSelectedFromWallet] = useState("Choose");
  const [selectedToWallet, setSelectedToWallet] = useState("Choose");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchWalletsData = useCallback(async () => {
    try {
      const wallets = await fetchWallets();
      setWalletList(wallets);
    } catch (error) {
      setSnackbarMessage(t("transferScreen.errorFetchWallets"));
      setSnackbarVisible(true);
    }
  }, [t]);

  useEffect(() => {
    fetchWalletsData();
  }, [isFocused, fetchWalletsData]);

  const handleTransferPress = async () => {
    const fromWallet = walletList.find(
      (wallet) => wallet.id === selectedFromWallet
    );
    const toWallet = walletList.find(
      (wallet) => wallet.id === selectedToWallet
    );
    const transferAmount = parseFloat(amount);

    if (!fromWallet || !toWallet) {
      setSnackbarMessage(t("transferScreen.selectWallets"));
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
        fromWallet,
        toWallet,
        transferAmount,
        date
      );
      setSnackbarMessage(message);
      setSnackbarVisible(true);

      setAmount("");
      setSelectedFromWallet("Choose");
      setSelectedToWallet("Choose");
    } catch (error) {
      setSnackbarMessage(error.message || t("transferScreen.transferFailed"));
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.amountInput}
          value={`$ ${amount}`}
          editable={false}
          mode='outlined'
        />

        <Keypad number={amount} setNumber={setAmount} />

        <DropdownInput
          label={t("test.fromWallet")}
          iconName='wallet'
          value={selectedFromWallet}
          setValue={setSelectedFromWallet}
          items={walletList.map((wallet) => ({
            value: wallet.id,
            label: `${wallet.name} ($${wallet.balance})`,
          }))}
        />

        <Divider />

        <DropdownInput
          label={t("test.toWallet")}
          iconName='wallet'
          value={selectedToWallet}
          setValue={setSelectedToWallet}
          items={walletList.map((wallet) => ({
            value: wallet.id,
            label: `${wallet.name} ($${wallet.balance})`,
          }))}
        />

        <Divider />

        <CustomButton
          mode='contained'
          style={styles.saveButton}
          onPress={handleTransferPress}
          icon='content-save-outline'>
          {t("test.save")}
        </CustomButton>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={6000}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  amountInput: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "left",
    backgroundColor: "#e0e0e0",
  },
});

export default TransferScreen;
