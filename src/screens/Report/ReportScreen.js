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

// Import custom components
import DropdownInput from "../../components/DropdownInput";
import DateInput from "../../components/DateInput";
import PieChartComponent from "../../components/PieChartComponent";
import SummaryView from "../../components/SummaryView";

// Import custom hook for managing report data
import useReportData from "../../hooks/Report/useReportData";

// ReportScreen component definition
const ReportScreen = () => {
  // Get translation function and report data using custom hook
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
    // Main container for report screen including loading indicator, filters, summary, and charts
    <View style={styles.container}>
      {/* Date input to set the start date of the report filter */}
      <DateInput
        label={t("reportScreen.startDate")}
        date={startDate}
        setDate={setStartDate}
      />
      <Divider />
      {/* Date input to set the end date of the report filter */}
      <DateInput
        label={t("reportScreen.endDate")}
        date={endDate}
        setDate={setEndDate}
      />
      <Divider />
      {/* Dropdown to filter the report by wallet */}
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
      {/* Show loading indicator when data is loading */}
      {loading && <ActivityIndicator size="large" />}
      {/* ScrollView for charts and summary */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading && (
          // Show the SummaryView and two PieChartComponent components if the loading is false
          <>
            <SummaryView
              income={totalIncome}
              expenses={totalExpenses}
              style={styles.summaryView}
            />
            <PieChartComponent
              title={t("reportScreen.expense")}
              data={expenseData}
            />
            <PieChartComponent
              title={t("reportScreen.income")}
              data={incomeData}
            />
          </>
        )}
      </ScrollView>
      {/* Snackbar for notifications */}
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
