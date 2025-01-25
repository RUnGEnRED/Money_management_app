import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import DropdownInput from "../../components/DropdownInput";
import CustomButton from "../../components/CustomButton";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [walletList, setWalletList] = useState([]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [selectedCurrency, setSelectedCurrency] = useState("Choose");
  const [selectedLanguage, setSelectedLanguage] = useState("Choose");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleNumberPress = (number) => {
    if (amount.includes(".")) {
      const decimalPart = amount.split(".")[1];
      if (decimalPart.length < 2) {
        setAmount(amount + number);
      }
    } else {
      setAmount(amount + number);
    }
  };

  const handleDotPress = () => {
    if (amount !== "" && !amount.includes(".")) {
      setAmount(amount + ".");
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // TEST TO DELETE TRANSACTIONS
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      categoryName: "Food",
      walletName: "Credit Card",
      date: "22-11-2024",
      amount: -1000,
      iconName: "silverware-fork-knife",
    },
    {
      id: 2,
      categoryName: "Transport",
      walletName: "Cash",
      date: "21-11-2024",
      amount: -100,
      iconName: "bus",
    },
    {
      id: 3,
      categoryName: "Salary",
      walletName: "Bank Account",
      date: "20-11-2024",
      amount: 5000,
      iconName: "cash-multiple",
    },
  ]);

  const handleDeleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };
  // TEST END

  return (
    <View style={styles.container}>
      <DropdownInput
        label={t("test.currency")}
        iconName="currency-usd"
        value={selectedCurrency}
        setValue={setSelectedCurrency}
        items={[
          { value: "usd", label: "$ - USD - US Dollar" },
          { value: "eur", label: "€ - EUR - Euro" },
          { value: "gbp", label: "£ - GBP - British Pound" },
        ]}
      />

      <Divider />

      <DropdownInput
        label={t("test.language")}
        iconName="cart"
        value={selectedLanguage}
        setValue={setSelectedLanguage}
        items={[
          { value: "en", label: "English - EN" },
          { value: "pl", label: "Polish - PL" },
          { value: "de", label: "Deutsch - DE" },
        ]}
      />

      <Divider />

      <CustomButton
        style={styles.saveButton}
        mode="contained"
        onPress={() => {}}
        icon="database"
      >
        {t("test.clear")}
      </CustomButton>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={6000}
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
  saveButton: {
    marginTop: 20,
    width: "40%",
  },
});
export default SettingsScreen;
