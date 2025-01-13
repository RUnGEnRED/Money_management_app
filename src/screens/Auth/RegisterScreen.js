import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Snackbar, Checkbox } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import { onRegister } from "../../services/Auth/AuthService";

function RegisterScreen({ navigation }) {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [checked, setChecked] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!checked) {
      setSnackbarMessage(t("registerScreen.terms"));
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const result = await onRegister(username, password, email, t);
      console.log("Register result:", result);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("registerScreen.title")}</Text>

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

      <TextInput
        label={t("registerScreen.email")}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
        />
        <Text style={styles.checkboxText}>{t("registerScreen.terms")}</Text>
      </View>

      <CustomButton
        title="Register"
        style={styles.button}
        onPress={register}
        loading={loading}
      >
        {t("startScreen.register")}
      </CustomButton>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.registerText}>
          {t("registerScreen.alreadyAccount")}
        </Text>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  registerText: {
    textAlign: "center",
    marginTop: 15,
    color: "#3498db",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
