import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

import StartScreen from "../screens/Auth/StartScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import AddNewWalletScreen from "../screens/Wallets/AddNewWalletScreen";
import AddNewCategoryScreen from "../screens/Categories/AddNewCategoryScreen";
import EditCategoryScreen from "../screens/Categories/EditCategoryScreen";
import EditWalletScreen from "../screens/Wallets/EditWalletScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

// StackNavigator component
const StackNavigator = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.colors.header,
    },
    headerTitle: {
      fontSize: 26,
    },
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add New Wallet"
        component={AddNewWalletScreen}
        options={{ title: t("stackNavigator.addNewWallet") }}
      />
      <Stack.Screen
        name="Add New Category"
        component={AddNewCategoryScreen}
        options={{ title: t("stackNavigator.addNewCategoryScreen") }}
      />
      <Stack.Screen
        name="Edit Category"
        component={EditCategoryScreen}
        options={{ title: t("stackNavigator.editCategoryScreen") }}
      />
      <Stack.Screen
        name="Edit Wallet"
        component={EditWalletScreen}
        options={{ title: t("stackNavigator.editWalletScreen") }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
