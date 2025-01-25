import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar } from "react-native-paper";
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
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const user = await getAuthToken();
      if (user && user.id) {
        const categoriesList = await axios.get(
          `/categories?user_id=${user.id}`
        );
        const expenseCategories = categoriesList.data.filter(
          (category) => category.type === "expense"
        );
        const incomeCategories = categoriesList.data.filter(
          (category) => category.type === "income"
        );

        setCategoryExpenseList(expenseCategories);
        setCategoryIncomeList(incomeCategories);
      } else {
        throw new Error("User is not authenticated or invalid token.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("homeScreen.errorFetchCategories"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  const deleteCategory = async (id) => {
    try {
      const user = await getAuthToken();
      if (user && user.id) {
        await axios.delete(`/categories/${id}?user_id=${user.id}`);
        setSnackbarMessage(t("Category deleted successfully"));
        setSnackbarVisible(true);

        setCategoryExpenseList((prev) =>
          prev.filter((category) => category.id !== id)
        );
        setCategoryIncomeList((prev) =>
          prev.filter((category) => category.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setSnackbarMessage(t("Category delete failed"));
      setSnackbarVisible(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size='large' />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Display Expense Categories */}
        {!loading &&
          categoryExpenseList.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              categoryName={category.name}
              categoryType={category.type}
              iconName={category.icon}
              iconColor='#ff0000'
              onEdit={() =>
                navigation.navigate("Edit Category", {
                  categoryId: category.id,
                  categoryName: category.name,
                  categoryType: category.type,
                  iconName: category.icon,
                  iconColor: "#ff0000",
                })
              }
              onDelete={deleteCategory}
              style={{ marginBottom: 10 }}
            />
          ))}

        {/* Display Income Categories */}
        {!loading &&
          categoryIncomeList.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              categoryName={category.name}
              categoryType={category.type}
              iconName={category.icon}
              iconColor='#006400'
              onEdit={() =>
                navigation.navigate("Edit Category", {
                  categoryId: category.id,
                  categoryName: category.name,
                  categoryType: category.type,
                  iconName: category.icon,
                  iconColor: "#006400",
                })
              }
              onDelete={deleteCategory}
              style={{ marginBottom: 10 }}
            />
          ))}

        <CustomButton
          style={styles.addButton}
          mode='contained'
          onPress={() => navigation.navigate("Add New Category")}
          icon='database'>
          {t("test.add")}
        </CustomButton>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={6000}>
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
