import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";

const AddNewWalletScreen = ({ navigation }) => {
  const { t } = useTranslation();

  // Stany dla formularza
  const [text, setText] = useState(""); // Nazwa portfela
  const [balance, setBalance] = useState(""); // Saldo początkowe
  const [selectedIcon, setSelectedIcon] = useState(null); // Wybrana ikona

  // Snackbar (powiadomienia)
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Lista ikon do wyboru
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

  // Obsługa wyboru ikony
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  // Walidacja i zapisanie portfela
  const saveWallet = async () => {
    if (!selectedIcon || text.trim() === "" || balance.trim() === "") {
      setSnackbarMessage(
        "Please select an icon, name the wallet, and specify an initial balance."
      );
      setSnackbarVisible(true);
      return;
    }

    try {
      const user = await getAuthToken();

      if (user && user.id) {
        const walletData = {
          name: text,
          balance: parseFloat(balance),
          icon: selectedIcon,
          user_id: user.id,
        };

        // Wysłanie danych do API
        const response = await axios.post("/wallets", walletData);
        const newWallet = response.data;

        // Nawigacja wstecz
        navigation.goBack();
      } else {
        throw new Error("Brak autentykacji użytkownika.");
      }
    } catch (error) {
      console.error("Error saving wallet:", error);
      setSnackbarMessage("Error saving wallet. Please try again.");
      setSnackbarVisible(true);
    }
  };

  // Zamknięcie powiadomienia
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      {/* Input dla nazwy portfela */}
      <CustomTextInput
        label='Wallet Name'
        value={text}
        onChangeText={setText}
        style={{ marginBottom: 12 }}
      />

      {/* Input dla początkowego salda */}
      <CustomTextInput
        label='Initial Balance'
        value={balance}
        onChangeText={setBalance}
        keyboardType='numeric'
        style={{ marginBottom: 24 }}
      />

      {/* Siatka ikon do wyboru */}
      <View style={styles.iconContainer}>
        <View style={styles.iconRow}>
          {icons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconBox,
                selectedIcon === icon && styles.selectedIcon,
              ]}
              onPress={() => handleIconSelect(icon)}>
              <Icon name={icon} size={30} color='darkgreen' />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Przycisk zapisu */}
      <CustomButton
        mode='contained'
        style={styles.saveButton}
        onPress={saveWallet}
        icon='content-save-outline'>
        {t("test.save")}
      </CustomButton>

      {/* Snackbar z błędami */}
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

export default AddNewWalletScreen;
