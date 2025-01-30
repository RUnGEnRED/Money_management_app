import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { updateCategory } from "../../services/Categories/CategoryService";

const useEditCategory = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const { categoryId, categoryName, categoryType, iconName, iconColor } =
    route.params;

  const [selectedIcon, setSelectedIcon] = useState(iconName);
  const [categoryNameInput, setCategoryNameInput] = useState(categoryName);
  const [transactionType, setTransactionType] = useState(categoryType);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setSelectedIcon(iconName);
    setCategoryNameInput(categoryName);
    setTransactionType(categoryType);
  }, [categoryName, categoryType, iconName]);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const handleSaveCategory = async () => {
    if (!selectedIcon || categoryNameInput.trim() === "") {
      setSnackbarMessage(t("useEditCategory.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      const updatedCategory = await updateCategory(
        categoryId,
        categoryNameInput,
        transactionType,
        selectedIcon,
        t
      );
      if (updatedCategory) {
        setSnackbarMessage(t("useEditCategory.categoryUpdated"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        setSnackbarMessage(t("useEditCategory.updateCategoryFailed"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setSnackbarMessage(
        t("useEditCategory.updateCategoryError") + error.message
      );
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return {
    selectedIcon,
    handleIconSelect,
    categoryNameInput,
    setCategoryNameInput,
    transactionType,
    setTransactionType,
    snackbarVisible,
    snackbarMessage,
    handleSaveCategory,
    handleSnackbarDismiss,
  };
};

export default useEditCategory;
