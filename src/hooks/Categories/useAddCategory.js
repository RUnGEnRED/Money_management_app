import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the add category service
import { addCategory } from "../../services/Categories/CategoryService";

// Custom hook for managing adding category logic
const useAddCategory = () => {
  // Get translation and navigation hooks
  const { t } = useTranslation();
  const navigation = useNavigation();

  // State variables for managing category data, snackbar, and loading
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to handle the selection of an icon
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  // Function to handle adding a new category
  const handleAddCategory = async () => {
    // If fields are empty show snackbar
    if (!selectedIcon || categoryName.trim() === "") {
      setSnackbarMessage(t("useAddCategory.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    try {
      // Call the add category service
      const newCategory = await addCategory(
        categoryName,
        transactionType,
        selectedIcon,
        t
      );
      // If category is created successfully show snackbar and go back
      if (newCategory) {
        setSnackbarMessage(t("useAddCategory.categoryAdded"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        // If category is not created show error message
        setSnackbarMessage(t("useAddCategory.addCategoryError"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      // If any error occurs log it and show error message
      console.error("Error creating category:", error);
      setSnackbarMessage(t("useAddCategory.addCategoryError") + error.message);
      setSnackbarVisible(true);
    }
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the state variables and functions
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
