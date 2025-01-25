import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import axios from "../../api/AxiosInstance"; // Poprawnie zaimportowane axios

import { useTranslation } from "react-i18next";

import { getAuthToken } from "../../services/Auth/AuthService";
import { createTransaction } from "../../services/TransactionService"; // Import funkcji z TransactionService

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
        console.log("User token:", user);

        const walletsList = await axios.get(`/wallets?user_id=${user.id}`);
        console.log("Wallets response:", walletsList.data);

        const categoriesList = await axios.get(
          `/categories?user_id=${user.id}`
        );
        console.log("Categories response:", categoriesList.data);

        const expenseCategories = categoriesList.data.filter(
          (category) => category.type === "expense"
        );
        const incomeCategories = categoriesList.data.filter(
          (category) => category.type === "income"
        );

        setCategoryExpenseList(expenseCategories);
        setCategoryIncomeList(incomeCategories);
        setWalletList(walletsList.data);
      } else {
        throw new Error("User is not authenticated or invalid token.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("transactionScreen.errorFetchData"));
      setSnackbarVisible(true);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  const filteredCategories =
    transactionType === "expense" ? categoryExpenseList : categoryIncomeList;

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleWalletChange = (newWallet) => {
    setSelectedWallet(newWallet);
  };

  const handleSaveTransaction = async () => {
    if (!amount || !selectedCategory || !selectedWallet) {
      setSnackbarMessage(t("Fill all fields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      await createTransaction(
        parseFloat(amount),
        selectedWallet,
        selectedCategory,
        transactionType,
        date
      );

      setSnackbarMessage(t("Transaction saved successfully"));
      setSnackbarVisible(true);
      setAmount("");
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TransactionTypeButtons
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
        <TextInput
          style={styles.amountInput}
          value={`$ ${amount}`}
          editable={false}
          mode='outlined'
        />
        <Keypad number={amount} setNumber={setAmount} />
        <DropdownInput
          label={t("test.category")}
          iconName='cart'
          value={selectedCategory}
          setValue={handleCategoryChange}
          items={filteredCategories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <Divider />
        <DropdownInput
          label={t("test.wallet")}
          iconName='wallet'
          value={selectedWallet}
          setValue={handleWalletChange}
          items={walletList.map((wallet) => ({
            value: wallet.id,
            label: wallet.name,
          }))}
        />
        <Divider />
        <DateInput label={t("test.data")} date={date} setDate={setDate} />
        <Divider />
        <CustomButton
          mode='contained'
          style={styles.saveButton}
          onPress={handleSaveTransaction}
          icon='content-save-outline'>
          {t("test.save")}
        </CustomButton>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
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
  saveButton: {
    marginTop: 20,
  },
});

export default TransactionScreen;
