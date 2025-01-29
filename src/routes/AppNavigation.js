import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";

// AppNavigation component
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
