import React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import TransactionScreen from "../screens/Transaction/TransactionScreen";
import TransferScreen from "../screens/Transfer/TransferScreen";
import HistoryScreen from "../screens/History/HistoryScreen";
import { removeAuthToken } from "../services/Auth/AuthService";

const Tab = createBottomTabNavigator();

// TabNavigator component
function TabNavigator() {
  return (
    // TODO: Fix/change logout position after testing
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Button
            onPress={() => {
              removeAuthToken();
              navigation.reset({
                index: 0,
                routes: [{ name: "Start" }],
              });
            }}
            title="Logout"
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
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
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="transfer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
