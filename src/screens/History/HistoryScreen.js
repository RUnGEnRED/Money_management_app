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
import TransactionItem from "../../components/TransactionItem";
import useHistoryData from "../../hooks/History/useHistoryData";

const HistoryScreen = () => {
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
  } = useHistoryData();

  return (
    <View style={styles.container}>
      <DateInput
        label={t("historyScreen.startDate")}
        date={startDate}
        setDate={setStartDate}
      />
      <Divider />

      <DateInput
        label={t("historyScreen.endDate")}
        date={endDate}
        setDate={setEndDate}
      />
      <Divider />

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

      {loading && <ActivityIndicator size="large" />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
