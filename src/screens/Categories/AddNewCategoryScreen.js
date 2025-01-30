// src/screens/Categories/AddNewCategoryScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";
import IconPicker from "../../components/IconPicker";
import { iconsCategorie } from "../../constants/icons";
import useAddCategory from "../../hooks/Categories/useAddCategory";

const AddNewCategoryScreen = () => {
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
    <View style={styles.container}>
      <TransactionTypeButtons
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <CustomTextInput
        label={t("addCategoryScreen.categoryName")}
        value={categoryName}
        onChangeText={setCategoryName}
        style={{ marginBottom: 12 }}
      />

      {/* Siatka ikon do wyboru */}
      <IconPicker
        icons={iconsCategorie}
        onIconSelect={handleIconSelect}
        selectedIcon={selectedIcon}
      />

      <CustomButton
        mode="contained"
        style={styles.saveButton}
        onPress={handleAddCategory}
        icon="content-save-outline"
      >
        {t("addCategoryScreen.add")}
      </CustomButton>

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
