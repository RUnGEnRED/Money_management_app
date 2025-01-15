import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // TODO: SET YOUR COLORS
    primary: "#6C9C43",
    secondary: "#9CD49F",
    accent: "#00FF00",
    background: "#FFFFFF",
    surface: "#E0FFE0",
    text: "#003913",
    error: "#B00020",

    header: "#E1F4CF", // header background color
    buttonBackground: "#9CD49E", // button background color
    buttonText: "#003813", // button text color

    tabColor: "#6C9C43", // tab color
    tabColorFocused: "#015D01", // tab color focused
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
          backgroundColor: "#9CD49E",
        },
        label: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#003813",
        },
      },
    },
    WalletItem: {
      styleOverrides: {
        walletItem: {
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          margin: 15,
          backgroundColor: "#D4E4CB",
          borderRadius: 20,
        },
        textContainer: {
          flex: 3,
        },
        totalBalanceText: {
          fontSize: 18,
          color: "black",
          marginTop: 5,
          marginLeft: 15,
        },
        balanceText: {
          fontSize: 28,
          fontWeight: "bold",
          color: "black",
          marginLeft: 15,
        },
        walletNameText: {
          fontSize: 16,
          color: "black",
          fontWeight: "bold",
          marginTop: 40,
          marginBottom: 5,
          marginLeft: 15,
        },
        iconContainer: {
          flex: 1,
          alignItems: "flex-end",
          margin: 20,
        },
      },
    },
    DropdownInput: {
      styleOverrides: {
        dropdown: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        },
        leftSection: {
          flex: 1,
          alignItems: "flex-start",
        },
        labelContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 2,
        },
        dropdownText: {
          fontSize: 16,
          fontWeight: "bold",
        },
        dropdownValue: {
          fontSize: 14,
          color: "gray",
        },
        icon: {
          marginRight: 8,
        },
        arrowIconContainer: {
          alignItems: "center",
        },
      },
    },
    DateInput: {
      styleOverrides: {
        container: {},
        dropdown: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        },
        leftSection: {
          flex: 1,
          alignItems: "flex-start",
        },
        labelContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 2,
        },

        dropdownText: {
          fontSize: 16,
          fontWeight: "bold",
        },
        dropdownValue: {
          fontSize: 14,
          color: "gray",
        },
        icon: {
          marginRight: 8,
        },
        arrowIconContainer: {
          alignItems: "center",
        },
      },
    },
    TransactionTypeButtons: {
      styleOverrides: {
        buttonContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        },
        typeButton: {
          flex: 1,
          marginHorizontal: 5,
          paddingVertical: 5,
          borderRadius: 10,
        },
      },
    },
  },
};

export default theme;
