import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import screen and component dependencies
import TabNavigator from "./TabNavigator";
import ReportScreen from "../screens/Report/ReportScreen";
import WalletsScreen from "../screens/Wallets/WalletsScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";

import CustomDrawerContent from "../components/CustomDrawerContent";

// Initialize drawer navigator
const Drawer = createDrawerNavigator();

// DrawerNavigator component definition
const DrawerNavigator = () => {
  // Use translation and theme hooks
  const { t } = useTranslation();
  const theme = useTheme();

  // Create styles for the drawer and header
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
    // Configure drawer navigator with custom content and options
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
      {/* Define the screens for the drawer navigator */}
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ title: t("drawerNavigator.mainScreen") }}
      />
      <Drawer.Screen
        name="Report"
        component={ReportScreen}
        options={{ title: t("drawerNavigator.reportScreen") }}
      />
      <Drawer.Screen
        name="Wallets"
        component={WalletsScreen}
        options={{ title: t("drawerNavigator.walletsScreen") }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: t("drawerNavigator.categoriesScreen") }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t("drawerNavigator.settingsScreen") }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
