import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

import useCurrency from "../hooks/useCurrency";

const SummaryView = ({ income, expenses }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const summaryViewTheme = theme.components.SummaryView.styleOverrides;
  const currency = useCurrency();

  return (
    <View style={summaryViewTheme.container}>
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
