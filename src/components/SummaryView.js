import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom hook for currency
import { useCurrencyContext } from "../context/CurrencyContext";

// SummaryView component definition
const SummaryView = ({ income, expenses }) => {
  // Get translation, theme and currency
  const { t } = useTranslation();
  const theme = useTheme();
  const summaryViewTheme = theme.components.SummaryView.styleOverrides;
  const { currency, setCurrency } = useCurrencyContext();

  return (
    // Render the container that shows the summary of the expenses and income.
    <View style={summaryViewTheme.container}>
      {/* View to render the expenses summary */}
      <View style={summaryViewTheme.summaryItem}>
        <Text style={summaryViewTheme.titleText}>
          {t("summaryView.expense")}
        </Text>
        <Text style={[summaryViewTheme.amountText, { color: "red" }]}>
          {" "}
          - {currency}
          {expenses}
        </Text>
      </View>
      {/* View to render the income summary */}
      <View style={summaryViewTheme.summaryItem}>
        <Text style={summaryViewTheme.titleText}>
          {t("summaryView.income")}
        </Text>
        <Text style={[summaryViewTheme.amountText, { color: "green" }]}>
          {" "}
          + {currency}
          {income}
        </Text>
      </View>
    </View>
  );
};

export default SummaryView;
