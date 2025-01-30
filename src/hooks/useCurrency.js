import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom hook to manage currency settings
const useCurrency = () => {
  // State to hold the currency value
  const [currency, setCurrency] = useState("USD");

  // Effect to fetch stored currency on component mount
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const storedCurrency = await AsyncStorage.getItem("currency");
        if (storedCurrency) {
          setCurrency(storedCurrency);
        }
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };
    fetchCurrency();
  }, []);

  // Return the currency value
  return currency;
};

export default useCurrency;
