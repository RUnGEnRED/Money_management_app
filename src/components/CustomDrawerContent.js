import React from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Import the function for removing the authentication token
import { removeAuthToken } from "../services/Auth/AuthService";

// CustomDrawerContent component definition
const CustomDrawerContent = (props) => {
  // Use translation, theme and navigation hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  // Function to handle user logout
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
    // Drawer Content ScrollView with the main content and logout button
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View>
        <DrawerItem
          label={t("drawerNavigator.logout")}
          onPress={handleLogOut}
          style={{
            backgroundColor: theme.colors.buttonBackground,
          }}
          labelStyle={{ color: theme.colors.buttonText, textAlign: "center" }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
