import React, { useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import { useRoute } from "@react-navigation/native";

const ShakeDetector = ({ targetScreen, navigation }) => {
  // Add the navigation prop
  const route = useRoute();

  useEffect(() => {
    let lastShakeTime = 0;

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      if (magnitude > 1.78) {
        // Adjust the threshold as needed
        const now = Date.now();
        if (now - lastShakeTime > 1000) {
          // Prevent multiple triggers
          lastShakeTime = now;
          // Check if the current route is not targetScreen
          if (route.name !== targetScreen) {
            navigation.navigate(targetScreen);
          }
        }
      }
    });

    Accelerometer.setUpdateInterval(100); // Adjust the update interval as needed

    return () => subscription && subscription.remove();
  }, [navigation, targetScreen, route]);

  return null;
};

export default ShakeDetector;
