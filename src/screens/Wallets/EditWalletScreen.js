import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import IconPicker from "../../components/IconPicker";
import CustomTextInput from "../../components/CustomTextInput";
import { iconsWallet } from "../../constants/icons";

import useEditWallet from "../../hooks/Wallets/useEditWallet";

const EditWalletScreen = () => {
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
    <View style={styles.container}>
      <CustomTextInput
        label={t("editWalletScreen.walletName")}
        value={walletNameInput}
        onChangeText={setWalletNameInput}
        style={{ marginBottom: 12 }}
      />

      <IconPicker
        icons={iconsWallet}
        onIconSelect={handleIconSelect}
        selectedIcon={selectedIcon}
      />

      <CustomButton
        mode="contained"
        style={styles.saveButton}
        onPress={saveWallet}
        icon="content-save-outline"
      >
        {t("editWalletScreen.save")}
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

export default EditWalletScreen;
