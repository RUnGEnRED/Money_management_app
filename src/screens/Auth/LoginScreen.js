import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom components and hook
import CustomButton from "../../components/CustomButton";
import useLogin from "../../hooks/Auth/useLogin";

// LoginScreen component definition
const LoginScreen = ({ navigation }) => {
  // Get translation function and login form data using the custom hook
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
    // Main container for login screen with title, inputs, button and navigation text.
    <View style={styles.container}>
      {/* Screen title */}
      <Text style={styles.title}>{t("loginScreen.title")}</Text>
      {/* Username Input */}
      <TextInput
        label={t("loginScreen.username")}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      {/* Password Input */}
      <TextInput
        label={t("loginScreen.password")}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry={true}
      />
      {/* Custom login button */}
      <CustomButton
        title="Login"
        style={styles.button}
        onPress={handleLogin}
        loading={loading}
      >
        {t("loginScreen.login")}
      </CustomButton>
      {/* Text to navigate to register screen */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>{t("loginScreen.noAccount")}</Text>
      </TouchableOpacity>
      {/* Snackbar for notifications */}
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
