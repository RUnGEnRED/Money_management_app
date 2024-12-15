import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Import screens
import HomeScreen from '../screens/Home/HomeScreen';
import TransactionScreen from '../screens/Transaction/TransactionScreen';
import TransferScreen from '../screens/Transfer/TransferScreen';
import HistoryScreen from '../screens/History/HistoryScreen';

const Tab = createBottomTabNavigator();

// TabNav component to define the bottom tab navigation structure
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Home',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="home" color="purple" size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Transaction" 
        component={TransactionScreen} 
        options={{
          title: 'Transactions',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="credit-card" color="purple" size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Transfer" 
        component={TransferScreen} 
        options={{
          title: 'Transfers',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="bank-transfer" color="purple" size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          title: 'History',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="history" color="purple" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
