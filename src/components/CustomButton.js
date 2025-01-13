import React from "react";
import { Button as PaperButton, useTheme } from "react-native-paper";

const CustomButton = (props) => {
  const theme = useTheme();
  const buttonTheme = theme.components.CustomButton;

  return (
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
