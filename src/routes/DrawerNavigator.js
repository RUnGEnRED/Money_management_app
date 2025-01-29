import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";

import TabNavigator from "./TabNavigator";
import ReportScreen from "../screens/Report/ReportScreen";
import WalletsScreen from "../screens/Wallets/WalletsScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";

import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

// DrawerNavigator component
const DrawerNavigator = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    drawerItem: {
      backgroundColor: theme.colors.buttonBackground,
      marginBottom: 10,
    },
    drawerLabel: {
      color: theme.colors.buttonText,
      textAlign: "center",
    },
    header: {
      backgroundColor: theme.colors.header,
    },
    headerTitle: {
      fontSize: 26,
    },
  });

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerItemStyle: styles.drawerItem,
        drawerLabelStyle: styles.drawerLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ title: "Main" }}
      />
      <Drawer.Screen name="Raport" component={ReportScreen} />
      <Drawer.Screen name="Wallets" component={WalletsScreen} />
      <Drawer.Screen name="Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
