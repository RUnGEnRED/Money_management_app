import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import IconPicker from "../../components/IconPicker";
import { iconsWallet } from "../../constants/icons";

import useAddWallet from "../../hooks/Wallets/useAddWallet";

const AddNewWalletScreen = () => {
  const { t } = useTranslation();
  const {
    walletName,
    setWalletName,
    balance,
    handleBalanceChange,
    selectedIcon,
    handleIconSelect,
    snackbarVisible,
    snackbarMessage,
    handleAddWallet,
    handleSnackbarDismiss,
  } = useAddWallet();

  return (
    <View style={styles.container}>
      <CustomTextInput
        label={t("addWalletScreen.walletName")}
        value={walletName}
        onChangeText={setWalletName}
        style={{ marginBottom: 12 }}
      />

      <CustomTextInput
        label={t("addWalletScreen.initialBalance")}
        value={balance}
        onChangeText={handleBalanceChange}
        keyboardType="numeric"
        style={{ marginBottom: 24 }}
      />

      <IconPicker
        icons={iconsWallet}
        onIconSelect={handleIconSelect}
        selectedIcon={selectedIcon}
      />

      <CustomButton
        mode="contained"
        style={styles.saveButton}
        onPress={handleAddWallet}
        icon="content-save-outline"
      >
        {t("addWalletScreen.add")}
      </CustomButton>

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

export default AddNewWalletScreen;
