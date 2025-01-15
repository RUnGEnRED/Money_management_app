import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import TabNavigator from "./TabNavigator";
import ReportScreen from "../screens/Report/ReportScreen";
import WalletsScreen from "../screens/Wallets/WalletsScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { removeAuthToken } from "../services/Auth/AuthService";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

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

// DrawerNavigator component
function DrawerNavigator() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    drawerItem: {
      backgroundColor: theme.colors.buttonBackground,
      marginBottom: 10,
    },
    drawerLabel: {
      color: theme.colors.buttonText,
      textAlign: "center",
    },
    header: {
      backgroundColor: theme.colors.header,
    },
    headerTitle: {
      fontSize: 26,
    },
  });

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerItemStyle: styles.drawerItem,
        drawerLabelStyle: styles.drawerLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ title: "Main" }}
      />
      <Drawer.Screen name="Raport" component={ReportScreen} />
      <Drawer.Screen name="Wallets" component={WalletsScreen} />
      <Drawer.Screen name="Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
