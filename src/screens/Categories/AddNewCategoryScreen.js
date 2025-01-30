import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom components and hook
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";
import IconPicker from "../../components/IconPicker";
import { iconsCategorie } from "../../constants/icons";

// Import the custom hook for adding new category
import useAddCategory from "../../hooks/Categories/useAddCategory";

// AddNewCategoryScreen component definition
const AddNewCategoryScreen = () => {
  // Get translation function and add category form data using the custom hook
  const { t } = useTranslation();
  const {
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
  } = useAddCategory();

  return (
    // Main container for add new category screen
    <View style={styles.container}>
      {/* Render the transaction type buttons */}
      <TransactionTypeButtons
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      {/* Input to set the category name */}
      <CustomTextInput
        label={t("addCategoryScreen.categoryName")}
        value={categoryName}
        onChangeText={setCategoryName}
        style={{ marginBottom: 12 }}
      />
      {/* Render the Icon picker component */}
      <IconPicker
        icons={iconsCategorie}
        onIconSelect={handleIconSelect}
        selectedIcon={selectedIcon}
      />
      {/* Button to add the new category */}
      <CustomButton
        mode="contained"
        style={styles.saveButton}
        onPress={handleAddCategory}
        icon="content-save-outline"
      >
        {t("addCategoryScreen.add")}
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
  iconContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
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

export default AddNewCategoryScreen;
