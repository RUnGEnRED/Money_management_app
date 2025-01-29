import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import useLogin from "../../hooks/Auth/useLogin";

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const {
    username,
    setUsername,
    password,
    setPassword,
    snackbarVisible,
    setSnackbarVisible,
    snackbarMessage,
    loading,
    handleLogin,
    handleSnackbarDismiss,
  } = useLogin();

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
        onPress={handleLogin}
        loading={loading}
      >
        {t("startScreen.login")}
      </CustomButton>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>{t("loginScreen.noAccount")}</Text>
      </TouchableOpacity>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

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
