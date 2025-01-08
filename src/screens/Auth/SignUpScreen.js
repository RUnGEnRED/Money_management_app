import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Screen</Text>
      <Button
        title="Go to Sign In"
        onPress={() => navigation.navigate("Sign In")}
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

export default SignUpScreen;
