import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

// Import Category service
import * as CategoryService from "../../services/Categories/CategoryService";

// Custom hook to manage category data and logic
const useCategoryData = () => {
  // Get translation, navigation and focus hooks
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // State variables for managing category data, loading, refreshing and snackbar
  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to fetch categories data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Get categories from the service
      const categoriesData = await CategoryService.getCategories(t);
      // Filter categories
      const expenseCategories = categoriesData.filter(
        (category) => category.type === "expense"
      );
      const incomeCategories = categoriesData.filter(
        (category) => category.type === "income"
      );
      // Set categories to the state variables
      setCategoryExpenseList(expenseCategories);
      setCategoryIncomeList(incomeCategories);
    } catch (error) {
      // Catch any errors that occur and show snackbar
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("useCategoryData.errorFetchCategories"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  // Fetch data if the screen is focused
  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused, fetchData]);

  // Function to handle refreshing the data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // Function to handle deleting a category
  const deleteCategory = async (id) => {
    try {
      await CategoryService.deleteCategory(id, t);
      // If delete is succesful show snackbar
      setSnackbarMessage(t("useCategoryData.categoryDeleted"));
      setSnackbarVisible(true);
      // Filter category from the state variables
      setCategoryExpenseList((prev) =>
        prev.filter((category) => category.id !== id)
      );
      setCategoryIncomeList((prev) =>
        prev.filter((category) => category.id !== id)
      );
    } catch (error) {
      // If any errors occur, log it and show snackbar
      console.error("Error deleting category:", error);
      setSnackbarMessage(t("useCategoryData.deleteFailed"));
      setSnackbarVisible(true);
    }
  };

  // Function to handle edit category
  const handleEditCategory = (category) => {
    navigation.navigate("Edit Category", {
      categoryId: category.id,
      categoryName: category.name,
      categoryType: category.type,
      iconName: category.icon,
      iconColor: category.iconColor,
    });
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the state variables and functions
  return {
    categoryExpenseList,
    categoryIncomeList,
    loading,
    refreshing,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    onRefresh,
    deleteCategory,
    handleEditCategory,
    handleSnackbarDismiss,
  };
};

export default useCategoryData;
