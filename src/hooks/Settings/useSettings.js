import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom hook for managing settings data and logic
const useSettings = () => {
  // Get translation and internationalization hooks
  const { t, i18n } = useTranslation();
  // State variables for managing settings, snackbar
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Function to fetch settings from AsyncStorage
  const fetchSettings = useCallback(async () => {
    try {
      // Get stored values for language and currency
      const storedCurrency = await AsyncStorage.getItem("currency");
      const storedLanguage = await AsyncStorage.getItem("language");
      // If value exists, set it to the state variables
      if (storedCurrency) {
        setSelectedCurrency(storedCurrency);
      }

      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }
    } catch (error) {
      // Log the errors
      console.error("Error fetching settings:", error);
    }
  }, []);
  // Fetch the settings when the screen loads
  useEffect(() => {
    fetchSettings();
  }, []);
  // Function to handle changing the app language
  const handleChangeLanguage = async (language) => {
    try {
      // Change the app language and set the new language to the storage and the state variable
      await i18n.changeLanguage(language);
      await AsyncStorage.setItem("language", language);
      setSelectedLanguage(language);
      // Set success snackbar
      setSnackbarMessage(t("useSettings.languageChanged"));
      setSnackbarVisible(true);
    } catch (error) {
      // If any error occurs log it and show error message in a snackbar.
      console.error("Error changing language:", error);
      setSnackbarMessage(t("useSettings.errorLanguage"));
      setSnackbarVisible(true);
    }
  };
  // Function to handle changing the app currency
  const handleChangeCurrency = async (currency) => {
    try {
      // Set the currency to the storage and state variable
      await AsyncStorage.setItem("currency", currency);
      setSelectedCurrency(currency);
      // Set success snackbar
      setSnackbarMessage(t("useSettings.currencyChanged"));
      setSnackbarVisible(true);
    } catch (error) {
      // If any errors occur, log it and show snackbar with an error message.
      console.error("Error changing currency:", error);
      setSnackbarMessage(t("useSettings.errorCurrency"));
      setSnackbarVisible(true);
    }
  };
  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return state variables and functions
  return {
    selectedCurrency,
    handleChangeCurrency,
    selectedLanguage,
    handleChangeLanguage,
    snackbarVisible,
    snackbarMessage,
    handleSnackbarDismiss,
  };
};

export default useSettings;
