import React from "react";
import { Button as PaperButton, useTheme } from "react-native-paper";

// CustomButton component definition
const CustomButton = (props) => {
  // Get the theme and the button's theme override
  const theme = useTheme();
  const buttonTheme = theme.components.CustomButton;

  return (
    // Render a PaperButton with custom styling and props
    <PaperButton
      {...props}
      mode={props.mode || buttonTheme.defaultProps.mode}
      uppercase={props.uppercase || buttonTheme.defaultProps.uppercase}
      style={[buttonTheme.styleOverrides.root, props.style]}
      labelStyle={[buttonTheme.styleOverrides.label, props.labelStyle]}
    >
      {props.children}
    </PaperButton>
  );
};

export default CustomButton;
