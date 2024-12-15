import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import screens
import ReportScreen from '../screens/Report/ReportScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { WalletsStack, CategoriesStack } from './StackNav'; // Import WalletsStack and CategoriesStack from StackNav.js
import TabNavigator from './TabNav'; // Import TabNavigator from TabNav.js

const Drawer = createDrawerNavigator();

// DrawerNav component to define the drawer navigation structure
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Report" component={ReportScreen} />
      <Drawer.Screen name="Wallets" component={WalletsStack} />
      <Drawer.Screen name="Categories" component={CategoriesStack} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
