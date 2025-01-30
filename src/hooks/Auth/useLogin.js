import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the login service
import { loginUser } from "../../services/Auth/AuthService";

// Custom hook for managing login logic
const useLogin = () => {
  // Get navigation and translation hooks
  const navigation = useNavigation();
  const { t } = useTranslation();

  // State variables for managing input fields, snackbar, and loading
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle the login process
  const handleLogin = async () => {
    // If fields are empty show snackbar
    if (!username || !password) {
      setSnackbarMessage(t("loginScreen.emptyFields"));
      setSnackbarVisible(true);
      return;
    }
    // Set loading to true and call login service
    setLoading(true);
    try {
      const result = await loginUser(username, password, t);
      // If login is successful, navigate to main screen
      if (result.success) {
        setSnackbarMessage(t("loginScreen.success"));
        setSnackbarVisible(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "DrawerNavigator" }],
        });
      } else {
        // If login failed, show the error message
        setSnackbarMessage(result.message);
        setSnackbarVisible(true);
      }
    } catch (error) {
      // If there is any error log it and set error message
      console.error("Login error:", error);
      setSnackbarMessage(t("authService.messageErrorLogin"));
      setSnackbarVisible(true);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  };

  // Function to handle snackbar dismiss
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Return the state variables and functions
  return {
    username,
    setUsername,
    password,
    setPassword,
    snackbarVisible,
    setSnackbarVisible,
    snackbarMessage,
    setSnackbarMessage,
    loading,
    handleLogin,
    handleSnackbarDismiss,
  };
};

export default useLogin;
