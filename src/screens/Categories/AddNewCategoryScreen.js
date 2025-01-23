import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";

const AddNewCategoryScreen = () => {
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

  const [text, setText] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      <TransactionTypeButtons
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <CustomTextInput
        label="Name"
        value={text}
        onChangeText={setText}
        style={{ marginBottom: 12 }}
      />

      <CustomButton
        mode="contained"
        style={styles.saveButton}
        onPress={() => {}}
        icon="content-save-outline"
      >
        {t("test.save")}
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
  amountInput: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "left",
    backgroundColor: "#e0e0e0",
  },
});

export default AddNewCategoryScreen;
