import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import CustomButton from "./CustomButton";

const TransactionTypeButtons = ({
  transactionType,
  onTransactionTypeChange,
}) => {
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
            ? { backgroundColor: "red" }
            : { backgroundColor: "white" },
        ]}
        onPress={() => onTransactionTypeChange("expense")}
        icon="minus-circle-outline"
      >
        {t("expense")}
      </CustomButton>
      <CustomButton
        mode={transactionType === "income" ? "outlined" : "contained"}
        style={[
          transactionTypeTheme.typeButton,
          transactionType === "income"
            ? { backgroundColor: "green" }
            : { backgroundColor: "white" },
        ]}
        onPress={() => onTransactionTypeChange("income")}
        icon="plus-circle-outline"
      >
        {t("income")}
      </CustomButton>
    </View>
  );
};

export default TransactionTypeButtons;
