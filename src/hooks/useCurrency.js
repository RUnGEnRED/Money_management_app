import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useCurrency() {
  const [currency, setCurrency] = useState("USD");

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
  return currency;
}

export default useCurrency;
