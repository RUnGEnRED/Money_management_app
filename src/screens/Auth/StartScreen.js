import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import CustomButton from "../../components/CustomButton";
import { getAuthToken } from "../../services/Auth/AuthService";

function StartScreen({ navigation }) {
  const { t } = useTranslation(); // Access the t function to translate strings

  // TODO: Add correct authentication logic for checking if user is already logged in
  useEffect(() => {
    const checkForToken = async () => {
      try {
        const userData = await getAuthToken();
        if (userData) {
          navigation.reset({
            index: 0,
            routes: [{ name: "DrawerNavigator" }],
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkForToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Login"
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          {t("startScreen.login")}
        </CustomButton>

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
}

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
