import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import WalletsScreen from "../screens/Wallets/WalletsScreen";
import AddNewWalletScreen from "../screens/Wallets/AddNewWalletScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import AddNewCategoryScreen from "../screens/Categories/AddNewCategoryScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

// AuthStack component
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// WalletsStack component
function WalletsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WalletsList"
        component={WalletsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add New Wallet" component={AddNewWalletScreen} />
    </Stack.Navigator>
  );
}

// CategoriesStack component
function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoriesList"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add New Category" component={AddNewCategoryScreen} />
    </Stack.Navigator>
  );
}

export { AuthStack, WalletsStack, CategoriesStack };
