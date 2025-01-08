import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import TabNavigator from "./TabNavigator";
import ReportScreen from "../screens/Report/ReportScreen";
import { WalletsStack, CategoriesStack } from "./StackNavigator";
import SettingsScreen from "../screens/Settings/SettingsScreen";

const Drawer = createDrawerNavigator();

// DrawerNavigator component
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ title: "Main", headerShown: false }}
      />
      <Drawer.Screen name="Raport" component={ReportScreen} />
      <Drawer.Screen name="Wallets" component={WalletsStack} />
      <Drawer.Screen name="Categories" component={CategoriesStack} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
