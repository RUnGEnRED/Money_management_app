import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { addCategory } from "../../services/Categories/CategoryService";

const useAddCategory = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const handleAddCategory = async () => {
    if (!selectedIcon || categoryName.trim() === "") {
      setSnackbarMessage(t("useAddCategory.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      const newCategory = await addCategory(
        categoryName,
        transactionType,
        selectedIcon,
        t
      );
      if (newCategory) {
        setSnackbarMessage(t("useAddCategory.categoryAdded"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        setSnackbarMessage(t("useAddCategory.addCategoryError"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setSnackbarMessage(t("useAddCategory.addCategoryError") + error.message);
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return {
    selectedIcon,
    handleIconSelect,
    categoryName,
    setCategoryName,
    transactionType,
    setTransactionType,
    snackbarVisible,
    snackbarMessage,
    handleAddCategory,
    handleSnackbarDismiss,
  };
};

export default useAddCategory;
