import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTheme } from "react-native-paper";

const CustomTextInput = ({ label, value, onChangeText, style }) => {
  const theme = useTheme();
  const customTextInputTheme = theme.components.CustomTextInput.styleOverrides;

  return (
    <View style={[customTextInputTheme.container, style]}>
      <Text style={customTextInputTheme.label}>{label}</Text>
      <TextInput
        style={customTextInputTheme.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Fill here"
        selectionColor="black"
      />
    </View>
  );
};

export default CustomTextInput;
