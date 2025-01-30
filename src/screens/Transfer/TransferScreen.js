import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom components
import CustomButton from "../../components/CustomButton";
import Keypad from "../../components/Keypad";
import DropdownInput from "../../components/DropdownInput";

// Import custom hook for transfer form data
import useTransferForm from "../../hooks/Transfer/useTransferForm";

// TransferScreen component definition
const TransferScreen = () => {
  // Get translation function and transfer form data using custom hook
  const { t } = useTranslation();
  const {
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
  } = useTransferForm();

  return (
    // Main container for transfer screen including inputs, button and snackbar
    <View style={styles.container}>
      <ScrollView>
        {/* Input for the amount that will be transfered */}
        <TextInput
          style={styles.amountInput}
          value={`${currency} ${amount}`}
          editable={false}
          mode="outlined"
        />
        {/* Component to input the amount */}
        <Keypad number={amount} setNumber={setAmount} />
        {/* Dropdown input to select the wallet to transfer funds from */}
        <DropdownInput
          label={t("transferScreen.fromWallet")}
          iconName="wallet"
          value={
            selectedFromWallet
              ? `${selectedFromWallet.name} ($${selectedFromWallet.balance})`
              : t("transferScreen.chooseWallet")
          }
          setValue={handleFromWalletChange}
          items={walletList.map((wallet) => ({
            value: wallet.id,
            label: `${wallet.name} ($${wallet.balance})`,
          }))}
        />

        <Divider />
        {/* Dropdown to select the wallet to transfer funds to */}
        <DropdownInput
          label={t("transferScreen.toWallet")}
          iconName="wallet"
          value={
            selectedToWallet
              ? `${selectedToWallet.name} ($${selectedToWallet.balance})`
              : t("transferScreen.chooseWallet")
          }
          setValue={handleToWalletChange}
          items={walletList.map((wallet) => ({
            value: wallet.id,
            label: `${wallet.name} ($${wallet.balance})`,
          }))}
        />

        <Divider />
        {/* Button to perform the transfer */}
        <CustomButton
          mode="contained"
          style={styles.saveButton}
          onPress={handleTransferPress}
          icon="content-save-outline"
        >
          {t("transferScreen.save")}
        </CustomButton>
      </ScrollView>
      {/* Snackbar to display notifications */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
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
