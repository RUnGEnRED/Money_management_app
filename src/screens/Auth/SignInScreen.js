import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In Screen</Text>
      <Button
        title="Go to DrawerNavigator"
        onPress={() => navigation.navigate("DrawerNavigator")}
      />
      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate("Sign Up")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SignInScreen;
