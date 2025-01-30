import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTheme } from "react-native-paper";

// CustomTextInput component definition
const CustomTextInput = ({ label, value, onChangeText, style }) => {
  // Get theme and style overrides
  const theme = useTheme();
  const customTextInputTheme = theme.components.CustomTextInput.styleOverrides;

  return (
    // Container for the TextInput including the label and the input field
    <View style={[customTextInputTheme.container, style]}>
      {/* Label for the TextInput */}
      <Text style={customTextInputTheme.label}>{label}</Text>
      {/* TextInput */}
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
