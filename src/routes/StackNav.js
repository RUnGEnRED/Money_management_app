import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WalletsScreen from '../screens/Wallets/WalletsScreen';
import AddNewWalletScreen from '../screens/Wallets/AddNewWalletScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import AddNewCategoryScreen from '../screens/Categories/AddNewCategoryScreen';

const Stack = createStackNavigator();

// WalletsStack component
function WalletsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wallets" component={WalletsScreen} />
      <Stack.Screen name="Add New Wallet" component={AddNewWalletScreen} />
    </Stack.Navigator>
  );
}

// CategoriesStack component
function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Add New Category" component={AddNewCategoryScreen} />
    </Stack.Navigator>
  );
}

export { WalletsStack, CategoriesStack };
