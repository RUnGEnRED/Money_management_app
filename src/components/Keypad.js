import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

// Import custom components
import CustomButton from "./CustomButton";

// Keypad component definition
const Keypad = ({ number, setNumber }) => {
  // Get the theme and style overrides
  const theme = useTheme();
  const keypadTheme = theme.components.Keypad.styleOverrides;

  // Define the layout of the keypad
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

  // Function to handle number presses
  const handleNumberPress = (numberKey) => {
    if (number.includes(".")) {
      const decimalPart = number.split(".")[1];
      if (decimalPart.length < 2) {
        setNumber(number + numberKey);
      }
    } else {
      setNumber(number + numberKey);
    }
  };

  // Function to handle dot presses
  const handleDotPress = () => {
    if (number !== "" && !number.includes(".")) {
      setNumber(number + ".");
    }
  };

  return (
    // Render the keypad with buttons
    <View style={keypadTheme.keypadContainer}>
      {keys.map((key, index) => (
        <View key={index} style={keypadTheme.keyContainer}>
          <CustomButton
            mode="contained"
            style={keypadTheme.keypadButton}
            onPress={() => {
              if (key === ".") {
                handleDotPress();
              } else if (key === "⌫") {
                setNumber(number.slice(0, -1));
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

export default Keypad;
