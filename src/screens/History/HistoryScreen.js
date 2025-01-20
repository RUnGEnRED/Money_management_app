import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import DropdownInput from "../../components/DropdownInput";
import DateInput from "../../components/DateInput";
import TransactionItem from "../../components/TransactionItem";

const HistoryScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [walletList, setWalletList] = useState([]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [selectedCategory, setSelectedCategory] = useState("Choose");
  const [selectedWallet, setSelectedWallet] = useState("Choose");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Set your data here
      // setCategoryIncomeList([...]); // Replace with actual data
      // setWalletList([...]); // Replace with actual data
    } catch (error) {
      console.error("Data fetch error: ", error);
      setSnackbarMessage(t("homeScreen.errorFetchWallets"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

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
      <DateInput label={t("test.data")} date={date} setDate={setDate} />

      <Divider />

      <DateInput label={t("test.data")} date={date} setDate={setDate} />

      <Divider />

      <DropdownInput
        label={t("test.category")}
        iconName="cart"
        value={selectedCategory}
        setValue={setSelectedCategory}
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
      {loading && <ActivityIndicator size="large" />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading &&
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              categoryName={transaction.categoryName}
              walletName={transaction.walletName}
              date={transaction.date}
              amount={transaction.amount}
              iconName={transaction.iconName}
              iconColor={transaction.amount > 0 ? "#33cc33" : "#ff0000"}
              onDelete={handleDeleteTransaction}
              style={{ marginTop: 10 }}
            />
          ))}
      </ScrollView>

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
});

export default HistoryScreen;
