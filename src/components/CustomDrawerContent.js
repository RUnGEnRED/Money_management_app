import React from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import { removeAuthToken } from "../services/Auth/AuthService";

function CustomDrawerContent(props) {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleLogOut = async () => {
    try {
      await removeAuthToken();
    } catch (error) {
      console.error("Error removing auth token:", error);
    } finally {
      navigation.reset({
        index: 0,
        routes: [{ name: "Start" }],
      });
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View>
        <DrawerItem
          label="Log out"
          onPress={handleLogOut}
          style={{
            backgroundColor: theme.colors.buttonBackground,
          }}
          labelStyle={{ color: theme.colors.buttonText, textAlign: "center" }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
