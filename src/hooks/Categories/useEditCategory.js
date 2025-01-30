import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the update category service
import { updateCategory } from "../../services/Categories/CategoryService";

// Custom hook to manage edit category logic
const useEditCategory = () => {
  // Get translation, navigation and route hooks
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  // Get route params
  const { categoryId, categoryName, categoryType, iconName, iconColor } =
    route.params;

  // State variables for managing edit form data, snackbar, loading, and more
  const [selectedIcon, setSelectedIcon] = useState(iconName);
  const [categoryNameInput, setCategoryNameInput] = useState(categoryName);
  const [transactionType, setTransactionType] = useState(categoryType);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Set the state for the edit category screen when it loads
  useEffect(() => {
    setSelectedIcon(iconName);
    setCategoryNameInput(categoryName);
    setTransactionType(categoryType);
  }, [categoryName, categoryType, iconName]);

  // Function to handle the selection of an icon
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  // Function to handle saving the edited category
  const handleSaveCategory = async () => {
    // If fields are empty, show snackbar
    if (!selectedIcon || categoryNameInput.trim() === "") {
      setSnackbarMessage(t("useEditCategory.emptyFields"));
      setSnackbarVisible(true);
      return;
    }
    // Call the update category service
    try {
      const updatedCategory = await updateCategory(
        categoryId,
        categoryNameInput,
        transactionType,
        selectedIcon,
        t
      );
      // If category is updated succesfully, show snackbar and go back
      if (updatedCategory) {
        setSnackbarMessage(t("useEditCategory.categoryUpdated"));
        setSnackbarVisible(true);
        navigation.goBack();
      } else {
        // If category update failed, show snackbar with error message
        setSnackbarMessage(t("useEditCategory.updateCategoryFailed"));
        setSnackbarVisible(true);
      }
    } catch (error) {
      // Catch any error that might occur, show snackbar with error message
      console.error("Error updating category:", error);
      setSnackbarMessage(
        t("useEditCategory.updateCategoryError") + error.message
      );
      setSnackbarVisible(true);
    }
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the state variables and functions
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
