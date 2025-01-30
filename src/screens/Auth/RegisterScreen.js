import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Snackbar, Checkbox } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import custom components and hook
import CustomButton from "../../components/CustomButton";
import useRegister from "../../hooks/Auth/useRegister";

// RegisterScreen component definition
const RegisterScreen = ({ navigation }) => {
  // Get translation and register form data using the custom hook
  const { t } = useTranslation();
  const {
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
  } = useRegister();

  return (
    // Main container for register screen with title, inputs, button and navigation text.
    <View style={styles.container}>
      {/* Screen title */}
      <Text style={styles.title}>{t("registerScreen.title")}</Text>
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
      {/* Confirm Password Input */}
      <TextInput
        label={t("registerScreen.confirmPassword")}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        style={styles.input}
        mode="outlined"
        secureTextEntry={true}
      />
      {/* Checkbox to accept terms and conditions */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
        />
        <Text style={styles.checkboxText}>{t("registerScreen.terms")}</Text>
      </View>
      {/* Custom register button */}
      <CustomButton
        title="Register"
        style={styles.button}
        onPress={handleRegister}
        loading={loading}
      >
        {t("startScreen.register")}
      </CustomButton>
      {/* Text to navigate to the login screen */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.registerText}>
          {t("registerScreen.alreadyAccount")}
        </Text>
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
