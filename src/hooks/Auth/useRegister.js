import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// Import the register user service
import { registerUser } from "../../services/Auth/AuthService";

// Custom hook for managing registration logic
const useRegister = () => {
  // Get navigation and translation hooks
  const navigation = useNavigation();
  const { t } = useTranslation();

  // State variables for managing input fields, snackbar, loading and check
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checked, setChecked] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle the registration process
  const handleRegister = async () => {
    // If fields are empty show snackbar
    if (!username || !password || !passwordConfirm) {
      setSnackbarMessage(t("loginScreen.emptyFields"));
      setSnackbarVisible(true);
      return;
    }
    // If password and confirm password don't match show snackbar
    if (password !== passwordConfirm) {
      setSnackbarMessage(t("registerScreen.passwordsNotMatch"));
      setSnackbarVisible(true);
      return;
    }
    // If terms and conditions are not accepted show snackbar
    if (!checked) {
      setSnackbarMessage(t("registerScreen.terms"));
      setSnackbarVisible(true);
      return;
    }
    // Set loading to true and call register service
    setLoading(true);
    try {
      const result = await registerUser(username, password, t);
      // If register is successful, navigate to main screen
      if (result.success) {
        setSnackbarMessage(t("registerScreen.success"));
        setSnackbarVisible(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "DrawerNavigator" }],
        });
      } else {
        // If register failed, show error message
        setSnackbarMessage(result.message);
        setSnackbarVisible(true);
      }
    } catch (error) {
      // If any errors are thrown log and set message
      console.error("Register error:", error);
      setSnackbarMessage(t("authService.messageErrorRegister"));
      setSnackbarVisible(true);
    } finally {
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
    passwordConfirm,
    setPasswordConfirm,
    checked,
    setChecked,
    snackbarVisible,
    setSnackbarVisible,
    snackbarMessage,
    loading,
    handleRegister,
    handleSnackbarDismiss,
  };
};

export default useRegister;
