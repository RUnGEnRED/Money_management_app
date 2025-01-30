import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import * as CategoryService from "../../services/Categories/CategoryService";

const useCategoryData = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const categoriesData = await CategoryService.getCategories(t);

      const expenseCategories = categoriesData.filter(
        (category) => category.type === "expense"
      );
      const incomeCategories = categoriesData.filter(
        (category) => category.type === "income"
      );

      setCategoryExpenseList(expenseCategories);
      setCategoryIncomeList(incomeCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("useCategoryData.errorFetchCategories"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    if (isFocused) fetchData();
  }, [isFocused, fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const deleteCategory = async (id) => {
    try {
      await CategoryService.deleteCategory(id, t);
      setSnackbarMessage(t("useCategoryData.categoryDeleted"));
      setSnackbarVisible(true);
      setCategoryExpenseList((prev) =>
        prev.filter((category) => category.id !== id)
      );
      setCategoryIncomeList((prev) =>
        prev.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      setSnackbarMessage(t("useCategoryData.deleteFailed"));
      setSnackbarVisible(true);
    }
  };

  const handleEditCategory = (category) => {
    navigation.navigate("Edit Category", {
      categoryId: category.id,
      categoryName: category.name,
      categoryType: category.type,
      iconName: category.icon,
      iconColor: category.iconColor,
    });
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);
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
