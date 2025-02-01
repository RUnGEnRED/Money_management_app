import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom components
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";
import IconPicker from "../../components/IconPicker";
import { iconsCategorie } from "../../constants/icons";

// Import custom hook for editing categories
import useEditCategory from "../../hooks/Categories/useEditCategory";

// EditCategoryScreen component definition
const EditCategoryScreen = () => {
  // Get translation function and edit category form data using the custom hook
  const { t } = useTranslation();
  const {
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
  } = useEditCategory();

  return (
    // Main container for edit category screen
    <View style={styles.container}>
      {/* Render the transaction type buttons */}
      {/* <TransactionTypeButtons
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      /> */}
      {/* Input to set the category name */}
      <CustomTextInput
        label={t("editCategoryScreen.categoryName")}
        value={categoryNameInput}
        onChangeText={setCategoryNameInput}
        style={{ marginBottom: 12 }}
      />
      {/* Render the Icon picker component */}
      <IconPicker
        icons={iconsCategorie}
        onIconSelect={handleIconSelect}
        selectedIcon={selectedIcon}
      />
      {/* Button to save the edited category */}
      <CustomButton
        mode="contained"
        style={styles.saveButton}
        onPress={handleSaveCategory}
        icon="content-save-outline"
      >
        {t("editCategoryScreen.save")}
      </CustomButton>
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
  iconContainer: {
    flex: 1,
    marginVertical: 20,
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    margin: 5,
  },
  selectedIcon: {
    borderWidth: 3,
    borderColor: "darkgreen",
  },
  saveButton: {
    marginTop: 20,
  },
});

export default EditCategoryScreen;
