import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./StackNavigator";

// MainNavigation component
function MainNavigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default MainNavigation;
