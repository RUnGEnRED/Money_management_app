import React from "react";
import { View } from "react-native";
import CustomButton from "./CustomButton";
import { useTheme } from "react-native-paper";

const Keypad = ({ number, setNumber }) => {
  const theme = useTheme();
  const keypadTheme = theme.components.Keypad.styleOverrides;
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

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

  const handleDotPress = () => {
    if (number !== "" && !number.includes(".")) {
      setNumber(number + ".");
    }
  };

  return (
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
