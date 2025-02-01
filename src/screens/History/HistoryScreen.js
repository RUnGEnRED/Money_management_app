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
import TransactionItem from "../../components/TransactionItem";

// Import custom hook for managing history data
import useHistory from "../../hooks/History/useHistory";

// HistoryScreen component definition
const HistoryScreen = () => {
  // Get translation function and history data using the custom hook
  const { t } = useTranslation();
  const {
    categories,
    transactions,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCategory,
    handleCategoryChange,
    snackbarVisible,
    setSnackbarVisible,
    snackbarMessage,
    loading,
    refreshing,
    onRefresh,
    filteredTransactions,
    handleDeleteTransaction,
    handleSnackbarDismiss,
  } = useHistory();

  return (
    // Main container for history screen including loading indicator, filters, and transaction list
    <View style={styles.container}>
      {/* Date input to choose the start date for the history filter */}
      <DateInput
        label={t("historyScreen.startDate")}
        date={startDate}
        setDate={setStartDate}
      />
      <Divider />
      {/* Date input to choose the end date for the history filter */}
      <DateInput
        label={t("historyScreen.endDate")}
        date={endDate}
        setDate={setEndDate}
      />
      <Divider />
      {/* Dropdown to filter the transactions by category */}
      <DropdownInput
        label={t("historyScreen.category")}
        iconName="cart"
        value={
          selectedCategory
            ? selectedCategory.name
            : t("historyScreen.allCategories")
        }
        setValue={handleCategoryChange}
        items={[
          { value: null, label: t("historyScreen.allCategories") },
          ...categories.map((category) => ({
            value: category.id,
            label: category.name,
          })),
        ]}
      />
      <Divider />
      {/* Show a loading indicator when data is loading */}
      {loading && <ActivityIndicator size="large" />}
      {/* ScrollView for transactions */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Map through all the transactions to render TransactionItem components */}
        {!loading &&
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              categoryName={transaction.category?.name || t("general.unknown")}
              walletName={transaction.wallet?.name || t("general.unknown")}
              date={transaction.date}
              amount={transaction.amount}
              iconName={transaction.category?.icon || "help-circle"}
              iconColor={transaction.amount > 0 ? "#33cc33" : "#ff0000"}
              onDelete={handleDeleteTransaction}
              style={{ marginTop: 10 }}
            />
          ))}
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
});

export default HistoryScreen;
