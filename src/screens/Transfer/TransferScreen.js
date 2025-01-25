import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import CustomButton from "../../components/CustomButton";
import Keypad from "../../components/Keypad";
import DropdownInput from "../../components/DropdownInput";

const TransferScreen = () => {
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

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.amountInput}
          value={`$ ${amount}`}
          editable={false}
          mode="outlined"
        />

        <Keypad number={amount} setNumber={setAmount} />

        <DropdownInput
          label={t("test.wallet")}
          iconName="wallet"
          value={selectedWallet}
          setValue={setSelectedWallet}
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

        <DropdownInput
          label={t("test.wallet")}
          iconName="wallet"
          value={selectedWallet}
          setValue={setSelectedWallet}
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

        <CustomButton
          mode="contained"
          style={styles.saveButton}
          onPress={() => {}}
          icon="content-save-outline"
        >
          {t("test.save")}
        </CustomButton>
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
  amountInput: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "left",
    backgroundColor: "#e0e0e0",
  },
});

export default TransferScreen;
