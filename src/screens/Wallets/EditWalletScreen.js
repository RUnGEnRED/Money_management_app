import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";

const EditWalletScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const { walletId, walletName, walletBalance, iconName } = route.params;

  const [selectedIcon, setSelectedIcon] = useState(iconName);
  const [walletNameInput, setWalletNameInput] = useState(walletName);

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

  useEffect(() => {
    setSelectedIcon(iconName);
    setWalletNameInput(walletName);
  }, [walletName, iconName]);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const saveWallet = async () => {
    if (!selectedIcon || walletNameInput.trim() === "") {
      setSnackbarMessage("Please select an icon and enter a wallet name.");
      setSnackbarVisible(true);
      return;
    }

    try {
      const user = await getAuthToken();
      if (user && user.id) {
        const walletData = {
          name: walletNameInput,
          balance: walletBalance,
          icon: selectedIcon,
          user_id: user.id,
        };

        await axios.put(`/wallets/${walletId}`, walletData);
        navigation.goBack();
      } else {
        throw new Error("User is not authenticated.");
      }
    } catch (error) {
      setSnackbarMessage("Error updating wallet: " + error.message);
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return (
    <View style={styles.container}>
      <CustomTextInput
        label='Wallet Name'
        value={walletNameInput}
        onChangeText={setWalletNameInput}
        style={{ marginBottom: 12 }}
      />

      {/* Icon Selection */}
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
              <Icon name={icon} size={30} color={"darkgreen"} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <CustomButton
        mode='contained'
        style={styles.saveButton}
        onPress={saveWallet}
        icon='content-save-outline'>
        {t("test.save")}
      </CustomButton>

      {/* Snackbar for feedback */}
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

export default EditWalletScreen;
