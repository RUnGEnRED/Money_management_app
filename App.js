import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './src/context/UserContext';
import DrawerNav from './src/routes/DrawerNav';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <UserProvider>
          <DrawerNav />
        </UserProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
