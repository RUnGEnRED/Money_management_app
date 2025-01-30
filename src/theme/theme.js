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
    WalletInfoItem: {
      styleOverrides: {
        walletInfoItem: {
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          margin: 10,
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
    TransactionItem: {
      styleOverrides: {
        container: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#D4E4CB",
          borderRadius: 20,
          padding: 10,
        },
        date: {
          color: "gray",
          paddingHorizontal: 5,
          fontSize: 14,
        },
        iconContainer: {
          backgroundColor: "#ffaaaa",
          borderRadius: 10,
          padding: 5,
          marginHorizontal: 5,
        },
        textContainer: {
          flex: 1,
          marginLeft: 5,
        },
        categoryName: {
          fontSize: 16,
          fontWeight: "bold",
        },
        walletName: {
          fontSize: 12,
          color: "gray",
        },
        amount: {
          fontWeight: "bold",
          fontSize: 16,
          paddingHorizontal: 5,
        },
        deleteButton: {
          backgroundColor: "red",
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 5,
        },
        deleteIcon: {
          color: "white",
          textAlign: "center",
        },
      },
    },
    Keypad: {
      styleOverrides: {
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
      },
    },
    CategoryItem: {
      styleOverrides: {
        container: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#D4E4CB",
          borderRadius: 20,
          padding: 10,
        },
        iconContainer: {
          backgroundColor: "#ffaaaa",
          borderRadius: 10,
          padding: 5,
          marginHorizontal: 5,
        },
        textContainer: {
          flex: 1,
          marginLeft: 5,
          justifyContent: "center",
        },
        categoryName: {
          fontSize: 16,
          fontWeight: "bold",
        },
        categoryType: {
          fontSize: 12,
          color: "gray",
        },
        editButton: {
          backgroundColor: "orange",
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 5,
        },
        deleteButton: {
          backgroundColor: "red",
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 5,
        },
        icon: {
          color: "white",
          textAlign: "center",
        },
      },
    },
    WalletItem: {
      styleOverrides: {
        container: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#D4E4CB",
          borderRadius: 20,
          padding: 10,
        },
        iconContainer: {
          backgroundColor: "#D4E4CB",
          borderRadius: 10,
          padding: 5,
          marginHorizontal: 5,
        },
        textContainer: {
          flex: 1,
          marginLeft: 5,
          justifyContent: "center",
        },
        walletName: {
          fontSize: 16,
          fontWeight: "bold",
        },
        editButton: {
          backgroundColor: "orange",
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 5,
        },
        deleteButton: {
          backgroundColor: "red",
          borderRadius: 10,
          padding: 10,
          marginHorizontal: 5,
        },
        icon: {
          color: "white",
          textAlign: "center",
        },
      },
    },
    CustomTextInput: {
      styleOverrides: {
        container: {
          backgroundColor: "#D4E4CB",
          padding: 10,
          borderRadius: 10,
        },
        label: {
          fontSize: 14,
          color: "gray",
        },
        input: {
          fontSize: 16,
        },
      },
    },
    PieChart: {
      styleOverrides: {
        container: {
          backgroundColor: "#D4E4CB",
          borderRadius: 20,
          padding: 15,
          margin: 5,
        },
        title: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
        },
        legendContainer: {
          flex: 1,
          paddingLeft: 10,
          marginTop: 10,
          marginLeft: 10,
        },
        legendItem: {
          marginBottom: 5,
        },
        legendColor: {
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: 5,
        },
        legendText: {
          fontSize: 14,
          textAlign: "left",
        },
        legendValues: {
          fontSize: 12,
          textAlign: "left",
        },
      },
    },
    SummaryView: {
      styleOverrides: {
        container: {
          backgroundColor: "#D4E4CB",
          borderRadius: 20,
          padding: 15,
          margin: 5,
        },
        titleText: {
          fontSize: 16,
        },
        amountText: {
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "right",
        },
        summaryItem: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        },
      },
    },
    IconPicker: {
      styleOverrides: {
        iconContainer: {},
        iconRow: {
          flexDirection: "row",
          flexWrap: "wrap",
        },
        iconBox: {
          width: "20%",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        },
        selectedIcon: {
          backgroundColor: "lightgreen",
          borderRadius: 10,
        },
      },
    },
  },
};

export default theme;
