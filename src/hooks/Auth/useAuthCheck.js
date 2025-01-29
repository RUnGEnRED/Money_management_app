import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuthToken } from "../../services/Auth/AuthService";

const useAuthCheck = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        const storedCurrency = await AsyncStorage.getItem("currency");
        if (storedCurrency === null) {
          await AsyncStorage.setItem("currency", "USD");
          console.log("Currency initialized to USD");
        }
      } catch (error) {
        console.error("Error initializing currency:", error);
      }
    };

    const checkForToken = async () => {
      try {
        const userData = await getAuthToken();
        if (userData) {
          navigation.reset({
            index: 0,
            routes: [{ name: "DrawerNavigator" }],
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };
    initializeCurrency();
    checkForToken();
  }, [navigation]);
};

export default useAuthCheck;
