import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";

// AppNavigation component
function AppNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default AppNavigation;
