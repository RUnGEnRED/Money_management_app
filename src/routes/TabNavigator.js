import React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useTheme } from "react-native-paper";

import HomeScreen from "../screens/Home/HomeScreen";
import TransactionScreen from "../screens/Transaction/TransactionScreen";
import TransferScreen from "../screens/Transfer/TransferScreen";
import HistoryScreen from "../screens/History/HistoryScreen";
import { removeAuthToken } from "../services/Auth/AuthService";

const Tab = createBottomTabNavigator();

// Separate function for tab bar icons
const getTabBarIcon =
  (theme) =>
  ({ route, size, focused }) => {
    let iconName;
    let iconColor;

    if (focused) {
      iconColor = theme.colors.tabColorFocused;
    } else {
      iconColor = theme.colors.tabColor;
    }

    switch (route.name) {
      case "Home":
        iconName = "home";
        break;
      case "Transaction":
        iconName = "cash-plus";
        break;
      case "Transfer":
        iconName = "transfer";
        break;
      case "History":
        iconName = "history";
        break;
      default:
        iconName = "home";
    }
    return (
      <MaterialCommunityIcons name={iconName} color={iconColor} size={size} />
    );
  };

// TabNavigator component
function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabColorFocused,
        tabBarInactiveTintColor: theme.colors.tabColor,
        tabBarStyle: { backgroundColor: theme.colors.header },
        tabBarIcon: ({ size, focused }) =>
          getTabBarIcon(theme)({ route, size, focused }),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      <Tab.Screen name="Transfer" component={TransferScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
