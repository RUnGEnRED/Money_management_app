import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { registerUser } from "../../services/Auth/AuthService";

const useRegister = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checked, setChecked] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !passwordConfirm) {
      setSnackbarMessage(t("loginScreen.emptyFields"));
      setSnackbarVisible(true);
      return;
    }

    if (password !== passwordConfirm) {
      setSnackbarMessage(t("registerScreen.passwordsNotMatch"));
      setSnackbarVisible(true);
      return;
    }

    if (!checked) {
      setSnackbarMessage(t("registerScreen.terms"));
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser(username, password, t);
      if (result.success) {
        setSnackbarMessage(t("registerScreen.success"));
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
      console.error("Register error:", error);
      setSnackbarMessage(t("authService.messageErrorRegister"));
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
