import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StartScreen from "../screens/Auth/StartScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import WalletsScreen from "../screens/Wallets/WalletsScreen";
import AddNewWalletScreen from "../screens/Wallets/AddNewWalletScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import AddNewCategoryScreen from "../screens/Categories/AddNewCategoryScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

// AuthStack component
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

// WalletsStack component
function WalletsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletsList" component={WalletsScreen} />
      <Stack.Screen name="Add New Wallet" component={AddNewWalletScreen} />
    </Stack.Navigator>
  );
}

// CategoriesStack component
function CategoriesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesList" component={CategoriesScreen} />
      <Stack.Screen name="Add New Category" component={AddNewCategoryScreen} />
    </Stack.Navigator>
  );
}

export { AuthStack, WalletsStack, CategoriesStack };
