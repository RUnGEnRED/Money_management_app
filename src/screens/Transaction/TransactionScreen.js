import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import Keypad from "../../components/Keypad";
import DropdownInput from "../../components/DropdownInput";
import DateInput from "../../components/DateInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";

import useTransactionForm from "../../hooks/Transaction/useTransactionForm";

const TransactionScreen = () => {
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
  } = useTransactionForm();

  return (
    <View style={styles.container}>
      <ScrollView>
        <TransactionTypeButtons
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
        <TextInput
          style={styles.amountInput}
          value={`${currency} ${amount}`}
          editable={false}
          mode="outlined"
        />
        <Keypad number={amount} setNumber={setAmount} />
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
        <DropdownInput
          label={t("transactionScreen.wallet")}
          iconName="wallet"
          value={
            selectedWallet
              ? selectedWallet.name
              : t("transactionScreen.chooseWallet")
          }
          setValue={handleWalletChange}
          items={walletList.map((wallet) => ({
            value: wallet.id,
            label: wallet.name,
          }))}
        />
        <Divider />
        <DateInput
          label={t("transactionScreen.date")}
          date={date}
          setDate={setDate}
        />
        <Divider />
        <CustomButton
          mode="contained"
          style={styles.saveButton}
          onPress={handleSaveTransaction}
          icon="content-save-outline"
        >
          {t("transactionScreen.save")}
        </CustomButton>
      </ScrollView>

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
