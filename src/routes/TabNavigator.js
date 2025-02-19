import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import screen components for the tab navigator
import HomeScreen from "../screens/Home/HomeScreen";
import TransactionScreen from "../screens/Transaction/TransactionScreen";
import TransferScreen from "../screens/Transfer/TransferScreen";
import HistoryScreen from "../screens/History/HistoryScreen";

// Initialize bottom tab navigator
const Tab = createBottomTabNavigator();

// TabNavigator component definition
const TabNavigator = () => {
  // Use the translation and theme hooks
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    // Configure the tab navigator with styling and screen options
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.header },
        tabBarActiveTintColor: theme.colors.tabColorFocused,
        tabBarInactiveTintColor: theme.colors.tabColor,
        headerShown: false,
      }}
    >
      {/* Define the screens for the tab navigator */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          title: t("tabNavigator.homeScreen"),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cash-plus"
              color={color}
              size={size}
            />
          ),
          title: t("tabNavigator.transactionScreen"),
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="transfer" color={color} size={size} />
          ),
          title: t("tabNavigator.transferScreen"),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
          title: t("tabNavigator.historyScreen"),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
