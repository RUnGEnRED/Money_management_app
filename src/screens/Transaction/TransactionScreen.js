import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom components
import CustomButton from "../../components/CustomButton";
import Keypad from "../../components/Keypad";
import DropdownInput from "../../components/DropdownInput";
import DateInput from "../../components/DateInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";

// Import the custom hook for managing the transaction form
import useTransaction from "../../hooks/Transaction/useTransaction";

// TransactionScreen component definition
const TransactionScreen = () => {
  // Get translation function and form data using the custom hook
  const { t } = useTranslation();
  const {
    transactionType,
    setTransactionType,
    amount,
    setAmount,
    date,
    setDate,
    selectedCategory,
    handleCategoryChange,
    selectedWallet,
    handleWalletChange,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    handleSnackbarDismiss,
    filteredCategories,
    walletList,
    handleSaveTransaction,
    currency,
  } = useTransaction();

  return (
    // View container that renders the transaction form
    <View style={styles.container}>
      <ScrollView>
        {/* Render the transaction type buttons */}
        <TransactionTypeButtons
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
        {/* Input for amount */}
        <TextInput
          style={styles.amountInput}
          value={`${currency} ${amount}`}
          editable={false}
          mode="outlined"
        />
        {/* Render the keypad for amount input */}
        <Keypad number={amount} setNumber={setAmount} />
        {/* Dropdown to choose category */}
        <DropdownInput
          label={t("transactionScreen.category")}
          iconName="cart"
          value={
            selectedCategory
              ? selectedCategory.name
              : t("transactionScreen.chooseCategory")
          }
          setValue={handleCategoryChange}
          items={filteredCategories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <Divider />
        {/* Dropdown to choose wallet */}
        <DropdownInput
          label={t("transactionScreen.wallet")}
          iconName="wallet"
          value={
            selectedWallet
              ? `${selectedWallet.name} (${currency}${selectedWallet.balance})`
              : t("transactionScreen.chooseWallet")
          }
          setValue={handleWalletChange}
          items={walletList.map((wallet) => ({
            value: wallet.id,
            label: `${wallet.name} (${currency}${wallet.balance})`,
          }))}
        />
        <Divider />
        {/* Input for date selection */}
        <DateInput
          label={t("transactionScreen.date")}
          date={date}
          setDate={setDate}
        />
        <Divider />
        {/* Button to save the transaction */}
        <CustomButton
          mode="contained"
          style={styles.saveButton}
          onPress={handleSaveTransaction}
          icon="content-save-outline"
        >
          {t("transactionScreen.save")}
        </CustomButton>
      </ScrollView>
      {/* Snackbar for notifications */}
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
  saveButton: {
    marginTop: 20,
  },
});

export default TransactionScreen;
