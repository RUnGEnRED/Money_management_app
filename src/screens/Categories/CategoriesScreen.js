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

import CategoryItem from "../../components/CategoryItem";
import CustomButton from "../../components/CustomButton";

import useCategoryData from "../../hooks/Categories/useCategoryData";

const CategoriesScreen = () => {
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
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        <CustomButton
          style={styles.addButton}
          mode="contained"
          onPress={() => navigation.navigate("Add New Category")}
          icon="database"
        >
          {t("categoriesScreen.add")}
        </CustomButton>
      </ScrollView>

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
