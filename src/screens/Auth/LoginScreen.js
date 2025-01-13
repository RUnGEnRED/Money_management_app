import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import { onLogin } from "../../services/Auth/AuthService";

function LoginScreen({ navigation }) {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const result = await onLogin(username, password, t);
      console.log("Login result:", result);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("loginScreen.title")}</Text>

      <TextInput
        label={t("loginScreen.username")}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label={t("loginScreen.password")}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry={true}
      />

      <CustomButton
        title="Login"
        style={styles.button}
        onPress={login}
        loading={loading}
      >
        {t("startScreen.login")}
      </CustomButton>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>{t("loginScreen.noAccount")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
  },
  registerText: {
    textAlign: "center",
    marginTop: 15,
    color: "#3498db",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
