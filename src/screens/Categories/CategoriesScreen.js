import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import CategoryItem from "../../components/CategoryItem";
import CustomButton from "../../components/CustomButton";

const CategoriesScreen = ({ navigation }) => {
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

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Set your data here
      // setCategoryIncomeList([...]); // Replace with actual data
      // setWalletList([...]); // Replace with actual data
    } catch (error) {
      console.error("Data fetch error: ", error);
      setSnackbarMessage(t("homeScreen.errorFetchWallets"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // TEST TO DELETE TRANSACTIONS
  const [categories, setCategories] = useState([
    {
      id: 1,
      categoryName: "Food",
      categoryType: "Expense",
      iconName: "silverware-fork-knife",
      iconColor: "#ff0000",
    },
    {
      id: 2,
      categoryName: "Transport",
      categoryType: "Expense",
      iconName: "bus",
      iconColor: "#0040ff",
    },
    {
      id: 3,
      categoryName: "Salary",
      categoryType: "Income",
      iconName: "cash-multiple",
      iconColor: "#00cc00",
    },
  ]);

  const handleEditCategory = (id) => {
    console.log(`Edit category with ID: ${id}`);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };
  // TEST END

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading &&
          categories.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              categoryName={category.categoryName}
              categoryType={category.categoryType}
              iconName={category.iconName}
              iconColor={category.iconColor}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              style={{ marginBottom: 10 }}
            />
          ))}

        <CustomButton
          style={styles.addButton}
          mode="contained"
          onPress={() => navigation.navigate("Add New Category")}
          icon="database"
        >
          {t("test.add")}
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
  addButton: {
    marginTop: 5,
    backgroundColor: "#f5f5f5",
    borderStyle: "dashed",
    borderColor: "#015D01",
    borderWidth: 2,
  },
});

export default CategoriesScreen;
