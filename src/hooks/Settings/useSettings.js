// src/hooks/Settings/useSettings.js
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useSettings() {
  const { t, i18n } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchSettings = useCallback(async () => {
    try {
      const storedCurrency = await AsyncStorage.getItem("currency");
      const storedLanguage = await AsyncStorage.getItem("language");
      if (storedCurrency) {
        setSelectedCurrency(storedCurrency);
      }

      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChangeLanguage = async (language) => {
    try {
      await i18n.changeLanguage(language);
      await AsyncStorage.setItem("language", language);
      setSelectedLanguage(language);
      setSnackbarMessage(t("useSettings.languageChanged"));
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error changing language:", error);
      setSnackbarMessage(t("useSettings.errorLanguage"));
      setSnackbarVisible(true);
    }
  };

  const handleChangeCurrency = async (currency) => {
    try {
      await AsyncStorage.setItem("currency", currency);
      setSelectedCurrency(currency);
      setSnackbarMessage(t("useSettings.currencyChanged"));
      setSnackbarVisible(true);
    } catch (error) {
      console.error("Error changing currency:", error);
      setSnackbarMessage(t("useSettings.errorCurrency"));
      setSnackbarVisible(true);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return {
    selectedCurrency,
    handleChangeCurrency,
    selectedLanguage,
    handleChangeLanguage,
    snackbarVisible,
    snackbarMessage,
    handleSnackbarDismiss,
  };
}

export default useSettings;
