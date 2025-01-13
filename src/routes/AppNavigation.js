import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./StackNavigator";

// MainNavigation component
function AppNavigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default AppNavigation;
