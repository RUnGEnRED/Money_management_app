import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import CustomButton from "./CustomButton";

const TransactionTypeButtons = ({ transactionType, setTransactionType }) => {
  const theme = useTheme();
  const transactionTypeTheme =
    theme.components.TransactionTypeButtons.styleOverrides;
  const { t } = useTranslation();

  return (
    <View style={transactionTypeTheme.buttonContainer}>
      <CustomButton
        mode={transactionType === "expense" ? "outlined" : "contained"}
        style={[
          transactionTypeTheme.typeButton,
          transactionType === "expense"
            ? { backgroundColor: "#ff4d4d" }
            : { backgroundColor: "white" },
        ]}
        onPress={() => setTransactionType("expense")}
        icon="minus-circle-outline"
      >
        {t("test.expense")}
      </CustomButton>
      <CustomButton
        mode={transactionType === "income" ? "outlined" : "contained"}
        style={[
          transactionTypeTheme.typeButton,
          transactionType === "income"
            ? { backgroundColor: "#33cc33" }
            : { backgroundColor: "white" },
        ]}
        onPress={() => setTransactionType("income")}
        icon="plus-circle-outline"
      >
        {t("test.income")}
      </CustomButton>
    </View>
  );
};

export default TransactionTypeButtons;
