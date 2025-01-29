import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { getAuthToken } from "../../services/Auth/AuthService";

const useAuthCheck = () => {
  const navigation = useNavigation();

  useEffect(() => {
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

    checkForToken();
  }, [navigation]);
};

export default useAuthCheck;
