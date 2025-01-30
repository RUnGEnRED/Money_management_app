import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";

// Define the AppNavigation component
const AppNavigation = () => {
  return (
    <NavigationContainer>
      {/* Render the StackNavigator component */}
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
