import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import CustomButton from "../../components/CustomButton";
import Keypad from "../../components/Keypad";
import DropdownInput from "../../components/DropdownInput";
import DateInput from "../../components/DateInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";

const TransactionScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [walletList, setWalletList] = useState([]);

  const [transactionType, setTransactionType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [selectedCategory, setSelectedCategory] = useState("Choose");
  const [selectedWallet, setSelectedWallet] = useState("Choose");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const user = await getAuthToken();
      if (user && user.id) {
        const walletsList = await axios.get(`/wallets?user_id=${user.id}`);
        const categoriesList = await axios.get(
          `/categories?user_id=${user.id}`
        );

        console.log("Wallets response: ", walletsList.data);
        console.log("Categories response: ", categoriesList.data);

        categoriesList.data.forEach((category) => {
          if (category.type === "expense") {
            setCategoryExpenseList((prev) => [...prev, category]);
          } else {
            setCategoryIncomeList((prev) => [...prev, category]);
          }
        });

        setWalletList(walletsList.data);
      }
    } catch (error) {
      console.error("Transaction fetch error: ", error);
      setSnackbarMessage(t("transactionScreen.errorFetchData"));
      setSnackbarVisible(true);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

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

  return (
    <>
      <ScrollView style={styles.container}>
        <TransactionTypeButtons
          transactionType={transactionType}
          onTransactionTypeChange={setTransactionType}
        />

        <TextInput
          style={styles.amountInput}
          value={`$ ${amount}`}
          editable={false}
          mode="outlined"
        />

        <Keypad
          amount={amount}
          setAmount={setAmount}
          handleDotPress={handleDotPress}
          handleNumberPress={handleNumberPress}
        />

        <DropdownInput
          label="category"
          iconName="cart"
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
          items={[
            { value: "food", label: "Food" },
            { value: "transport", label: "Transport" },
            {
              value: "shopping",
              label: "Shopping",
            },
          ]}
        />

        <Divider />

        <DropdownInput
          label="wallet"
          iconName="wallet"
          selectedValue={selectedWallet}
          onValueChange={setSelectedWallet}
          items={[
            { value: "cash", label: "Cash" },
            {
              value: "credit",
              label: "Credit Card",
            },
            { value: "bank", label: "Bank Account" },
          ]}
        />

        <Divider />

        <DateInput label="date" selectedValue={date} onValueChange={setDate} />

        <Divider />

        <CustomButton
          mode="contained"
          style={styles.saveButton}
          onPress={() => {}}
          icon="content-save-outline"
        >
          {t("save")}
        </CustomButton>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={handleSnackbarDismiss}
          duration={6000}
        >
          {snackbarMessage}
        </Snackbar>
      </ScrollView>
    </>
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

export default TransactionScreen;
