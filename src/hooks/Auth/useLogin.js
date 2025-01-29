import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { loginUser } from "../../services/Auth/AuthService";

const useLogin = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setSnackbarMessage(t("loginScreen.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(username, password, t);
      if (result.success) {
        setSnackbarMessage(t("loginScreen.success"));
        setSnackbarVisible(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "DrawerNavigator" }],
        });
      } else {
        setSnackbarMessage(result.message);
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage(t("authService.messageErrorLogin"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

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
