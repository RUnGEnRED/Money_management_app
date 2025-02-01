import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import currency context and auth token
import { useCurrencyContext } from "../../context/CurrencyContext";
import { getAuthToken } from "../../services/Auth/AuthService";

// Custom hook for checking inital configuration and auth token
const useStart = () => {
  // Get navigation hook and translation function
  const { i18n } = useTranslation();
  const navigation = useNavigation();
  const { currency, setCurrency } = useCurrencyContext();

  useEffect(() => {
    // Initialize currency in the storage
    const initializeCurrency = async () => {
      try {
        const storedCurrency = await AsyncStorage.getItem("currency");
        // Check if currency exists if not set it
        if (storedCurrency === null) {
          setCurrency("$ ");
          await AsyncStorage.setItem("currency", "$ ");
          console.log("Currency initialized to USD");
        } else {
          setCurrency(storedCurrency);
          console.log("Currency already set");
        }
      } catch (error) {
        // Catch any error that might occur
        console.error("Error initializing currency:", error);
      }
    };

    // Initialize language in the storage
    const initializeLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        // Check if language exists if not set it
        if (storedLanguage === null) {
          await AsyncStorage.setItem("language", "en");
          console.log("Language initialized to English");
        } else {
          await i18n.changeLanguage(storedLanguage);
          console.log("Language already set");
        }
      } catch (error) {
        // Catch any error that might occur
        console.error("Error initializing language:", error);
      }
    };

    // Check if the user is logged in
    const checkForToken = async () => {
      try {
        // If user is logged in navigate to the main screen
        const userData = await getAuthToken();
        if (userData) {
          navigation.reset({
            index: 0,
            routes: [{ name: "DrawerNavigator" }],
          });
        }
      } catch (error) {
        // Catch any error that might occur
        console.error("Auth check error:", error);
      }
    };
    initializeCurrency();
    initializeLanguage();
    checkForToken();
  }, [navigation]); // Run this effect only when navigation changes
};

export default useStart;
