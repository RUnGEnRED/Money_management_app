import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

// Import custom components
import CategoryItem from "../../components/CategoryItem";
import CustomButton from "../../components/CustomButton";

// Import custom hook for managing category data
import useCategoryData from "../../hooks/Categories/useCategoryData";

// CategoriesScreen component definition
const CategoriesScreen = () => {
  // Get translation, navigation and category data using custom hook
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
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
  } = useCategoryData();

  return (
    // Main container for categories screen
    <View style={styles.container}>
      {/* Show a loading indicator when data is loading */}
      {loading && <ActivityIndicator size="large" />}
      {/* ScrollView for categories and add button */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Map through all the expense categories to render CategoryItem components */}
        {!loading &&
          categoryExpenseList.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              categoryName={category.name}
              categoryType={category.type}
              iconName={category.icon}
              iconColor="#ff0000"
              onEdit={() => handleEditCategory(category)}
              onDelete={deleteCategory}
              style={{ marginBottom: 10 }}
            />
          ))}
        {/* Map through all the income categories to render CategoryItem components */}
        {!loading &&
          categoryIncomeList.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              categoryName={category.name}
              categoryType={category.type}
              iconName={category.icon}
              iconColor="#006400"
              onEdit={() => handleEditCategory(category)}
              onDelete={deleteCategory}
              style={{ marginBottom: 10 }}
            />
          ))}
        {/* Custom button to navigate to the add category screen */}
        <CustomButton
          style={styles.addButton}
          mode="contained"
          onPress={() => navigation.navigate("Add New Category")}
          icon="database"
        >
          {t("categoriesScreen.add")}
        </CustomButton>
      </ScrollView>
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
  addButton: {
    marginTop: 5,
    backgroundColor: "#f5f5f5",
    borderStyle: "dashed",
    borderColor: "#015D01",
    borderWidth: 2,
  },
});

export default CategoriesScreen;
