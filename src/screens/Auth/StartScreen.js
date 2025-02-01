import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

// Import custom components and hooks
import CustomButton from "../../components/CustomButton";
import useStart from "../../hooks/Auth/useStart";

// StartScreen component definition
const StartScreen = ({ navigation }) => {
  // Get translation function, and check auth using custom hook
  const { t } = useTranslation();
  useStart();

  return (
    // Main container with logo and buttons
    <View style={styles.container}>
      {/* App logo image */}
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      {/* Container for the buttons */}
      <View style={styles.buttonContainer}>
        {/* Custom login button */}
        <CustomButton
          title="Login"
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          {t("startScreen.login")}
        </CustomButton>
        {/* Custom register button */}
        <CustomButton
          title="Register"
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          {t("startScreen.register")}
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
    tintColor: "green",
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default StartScreen;
