import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import TransactionTypeButtons from "../../components/TransactionTypeButtons";

const AddNewCategoryScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [text, setText] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const icons = [
    "currency-usd",
    "gift",
    "food",
    "trending-up",
    "car",
    "movie",
    "flower",
    "home",
    "briefcase",
    "account-circle",
    "account-check",
    "bank",
    "brush",
    "cloud",
    "coffee",
    "camera",
    "star",
    "heart",
    "checkbox-marked",
    "bell",
    "credit-card",
    "cash",
    "plus-circle",
    "hammer",
    "scale-balance",
    "lightbulb",
    "headphones",
    "rocket",
    "recycle",
    "bank",
    "wallet",
    "cog",
    "map-marker",
    "television",
    "bicycle",
  ];

  const handleIconSelect = (icon) => {
    setSelectedCategory(icon);
  };

  const saveCategory = async () => {
    if (!selectedCategory || text.trim() === "") {
      setSnackbarMessage("Please select an icon and enter a category name.");
      setSnackbarVisible(true);
      return;
    }

    try {
      const user = await getAuthToken();

      if (user && user.id) {
        const categoryData = {
          name: text,
          type: transactionType,
          icon: selectedCategory,
          user_id: user.id,
        };

        const response = await axios.post("/categories", categoryData);
        const transaction = response.data;

        navigation.goBack();
      } else {
        throw new Error("Brak autentykacji użytkownika.");
      }
    } catch (error) {
      throw new Error("Błąd przy tworzeniu kategorii: " + error.message);
    }

    setSnackbarVisible(true);
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      <TransactionTypeButtons
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <CustomTextInput
        label='Category Name'
        value={text}
        onChangeText={setText}
        style={{ marginBottom: 12 }}
      />

      <View style={styles.iconContainer}>
        <View style={styles.iconRow}>
          {icons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconBox,
                selectedCategory === icon && styles.selectedIcon,
              ]}
              onPress={() => handleIconSelect(icon)}>
              <Icon name={icon} size={30} color='darkgreen' />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <CustomButton
        mode='contained'
        style={styles.saveButton}
        onPress={saveCategory}
        icon='content-save-outline'>
        {t("test.save")}
      </CustomButton>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={6000}>
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
