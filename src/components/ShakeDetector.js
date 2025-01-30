import React, { useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import { useRoute } from "@react-navigation/native";

// ShakeDetector component definition
const ShakeDetector = ({ targetScreen, navigation }) => {
  // Get the current route using useRoute hook
  const route = useRoute();

  useEffect(() => {
    // Setup variables to manage shake events and subscription
    let lastShakeTime = 0;

    // Create a subscription to the accelerometer data
    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      // Detect a shake event based on magnitude
      if (magnitude > 1.78) {
        const now = Date.now();
        // Check if enough time has passed since the last shake to prevent rapid navigation
        if (now - lastShakeTime > 1000) {
          lastShakeTime = now;
          // Check if the current route is not the target route to navigate.
          if (route.name !== targetScreen) {
            navigation.navigate(targetScreen);
          }
        }
      }
    });

    // Set update interval for the accelerometer readings
    Accelerometer.setUpdateInterval(100);

    // Cleanup the subscription on unmount
    return () => subscription && subscription.remove();
  }, [navigation, targetScreen, route]); // Update whenever these values change

  return null;
};

export default ShakeDetector;
