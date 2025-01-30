import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom components
import CustomButton from "../../components/CustomButton";
import IconPicker from "../../components/IconPicker";
import CustomTextInput from "../../components/CustomTextInput";
import { iconsWallet } from "../../constants/icons";

// Import custom hook for editing wallets
import useEditWallet from "../../hooks/Wallets/useEditWallet";

// EditWalletScreen component definition
const EditWalletScreen = () => {
  // Get translation function and edit wallet form data using custom hook
  const { t } = useTranslation();
  const {
    selectedIcon,
    handleIconSelect,
    walletNameInput,
    setWalletNameInput,
    snackbarVisible,
    snackbarMessage,
    saveWallet,
    handleSnackbarDismiss,
  } = useEditWallet();

  return (
    // Main container for edit wallet screen including name, icons, and button to save
    <View style={styles.container}>
      {/* Input to edit the wallet name */}
      <CustomTextInput
        label={t("editWalletScreen.walletName")}
        value={walletNameInput}
        onChangeText={setWalletNameInput}
        style={{ marginBottom: 12 }}
      />
      {/* Icon picker component to select a new icon for the wallet */}
      <IconPicker
        icons={iconsWallet}
        onIconSelect={handleIconSelect}
        selectedIcon={selectedIcon}
      />
      {/* Button to save the edited wallet */}
      <CustomButton
        mode="contained"
        style={styles.saveButton}
        onPress={saveWallet}
        icon="content-save-outline"
      >
        {t("editWalletScreen.save")}
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

export default EditWalletScreen;
