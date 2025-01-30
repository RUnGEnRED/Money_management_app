// src/screens/Settings/SettingsScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

import DropdownInput from "../../components/DropdownInput";
import useSettings from "../../hooks/Settings/useSettings";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const {
    selectedCurrency,
    handleChangeCurrency,
    selectedLanguage,
    handleChangeLanguage,
    snackbarVisible,
    snackbarMessage,
    handleSnackbarDismiss,
    setSnackbarVisible,
  } = useSettings();

  return (
    <View style={styles.container}>
      <DropdownInput
        label={t("settingsScreen.currency")}
        iconName="currency-usd"
        value={selectedCurrency}
        setValue={handleChangeCurrency}
        items={[
          { value: "$ ", label: "$ - USD - US Dollar" },
          { value: "€ ", label: "€ - EUR - Euro" },
          { value: "£ ", label: "£ - GBP - British Pound" },
        ]}
      />

      <Divider />

      <DropdownInput
        label={t("settingsScreen.language")}
        iconName="translate"
        value={selectedLanguage}
        setValue={handleChangeLanguage}
        items={[
          { value: "en", label: "English - EN" },
          { value: "pl", label: "Polish - PL" },
          { value: "de", label: "Deutsch - DE" },
        ]}
      />

      <Divider />

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
  saveButton: {
    marginTop: 20,
    width: "40%",
  },
});

export default SettingsScreen;
