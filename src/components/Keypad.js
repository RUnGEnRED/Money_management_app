import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "./CustomButton"; // Adjust the path if necessary

const Keypad = ({ amount, setAmount, handleDotPress, handleNumberPress }) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

  return (
    <View style={styles.keypadContainer}>
      {keys.map((key, index) => (
        <View key={index} style={styles.keyContainer}>
          <CustomButton
            mode="contained"
            style={styles.keypadButton}
            onPress={() => {
              if (key === ".") {
                handleDotPress();
              } else if (key === "⌫") {
                setAmount(amount.slice(0, -1));
              } else {
                handleNumberPress(key);
              }
            }}
          >
            {key}
          </CustomButton>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  keyContainer: {
    width: "33.33%",
    padding: 5,
  },
  keypadButton: {
    flex: 1,
  },
});

export default Keypad;
