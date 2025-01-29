import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Snackbar, Checkbox } from "react-native-paper";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import useRegister from "../../hooks/Auth/useRegister";

const RegisterScreen = ({ navigation }) => {
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
        label={t("registerScreen.confirmPassword")}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        style={styles.input}
        mode="outlined"
        secureTextEntry={true}
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
        onPress={handleRegister}
        loading={loading}
      >
        {t("startScreen.register")}
      </CustomButton>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.registerText}>
          {t("registerScreen.alreadyAccount")}
        </Text>
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
