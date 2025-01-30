import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

import DropdownInput from "../../components/DropdownInput";
import DateInput from "../../components/DateInput";
import PieChart from "../../components/PieChart";
import SummaryView from "../../components/SummaryView";

import useReportData from "../../hooks/Report/useReportData";

const ReportScreen = () => {
  const { t } = useTranslation();
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedWallet,
    handleWalletChange,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    loading,
    refreshing,
    onRefresh,
    incomeData,
    expenseData,
    totalIncome,
    totalExpenses,
    wallets,
    handleSnackbarDismiss,
  } = useReportData();

  return (
    <View style={styles.container}>
      <DateInput
        label={t("reportScreen.startDate")}
        date={startDate}
        setDate={setStartDate}
      />
      <Divider />

      <DateInput
        label={t("reportScreen.endDate")}
        date={endDate}
        setDate={setEndDate}
      />

      <Divider />

      <DropdownInput
        label={t("reportScreen.wallet")}
        iconName="wallet"
        value={
          selectedWallet ? selectedWallet.name : t("reportScreen.allWallets")
        }
        setValue={handleWalletChange}
        items={[
          { value: null, label: t("reportScreen.allWallets") },
          ...wallets.map((wallet) => ({
            value: wallet.id,
            label: wallet.name,
          })),
        ]}
      />

      <Divider />

      {loading && <ActivityIndicator size="large" />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading && (
          <>
            <SummaryView
              income={totalIncome}
              expenses={totalExpenses}
              style={styles.summaryView}
            />
            <PieChart title={t("reportScreen.expense")} data={expenseData} />
            <PieChart title={t("reportScreen.income")} data={incomeData} />
          </>
        )}
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
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
  summaryView: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ReportScreen;
