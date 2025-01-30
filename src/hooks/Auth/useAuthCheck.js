import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import authentication service
import { getAuthToken } from "../../services/Auth/AuthService";

// Custom hook for checking user authentication status
const useAuthCheck = () => {
  // Get navigation hook
  const navigation = useNavigation();

  useEffect(() => {
    // Initialize currency in the storage
    const initializeCurrency = async () => {
      try {
        const storedCurrency = await AsyncStorage.getItem("currency");
        // Check if currency exists if not set it
        if (storedCurrency === null) {
          await AsyncStorage.setItem("currency", "$ ");
          console.log("Currency initialized to USD");
        }
      } catch (error) {
        // Catch any error that might occur
        console.error("Error initializing currency:", error);
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
    checkForToken();
  }, [navigation]); // Run this effect only when navigation changes
};

export default useAuthCheck;
