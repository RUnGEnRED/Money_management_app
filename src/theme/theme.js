import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007AFF",
    secondary: "#32CD32",
    accent: "#FF4500",
    background: "#F5F5F5",
    surface: "#fff",
    text: "#212121",
    error: "#B00020",
    buttonText: "#FFFFFF", // Added button text color
  },
  components: {
    CustomButton: {
      defaultProps: {
        mode: "contained",
        uppercase: false,
      },
      styleOverrides: {
        root: {
          padding: 8,
          backgroundColor: "#9CD49F",
        },
        label: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#003913", // Added button text color
        },
      },
    },
  },
};

export default theme;
