import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Menu, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

// DropdownInput component definition
const DropdownInput = ({ label, iconName, value, setValue, items }) => {
  // State for menu visibility
  const [menuVisible, setMenuVisible] = useState(false);
  // Get translation and theme
  const { t } = useTranslation();
  const theme = useTheme();
  const dropdownTheme = theme.components.DropdownInput.styleOverrides;

  // Function to open the dropdown menu
  const openMenu = () => setMenuVisible(true);
  // Function to close the dropdown menu
  const closeMenu = () => setMenuVisible(false);

  return (
    // Render the dropdown menu with a touchable anchor
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <View style={dropdownTheme.dropdown}>
            <View style={dropdownTheme.leftSection}>
              <View style={dropdownTheme.labelContainer}>
                <Icon
                  name={iconName}
                  size={24}
                  color={theme.colors.primary}
                  style={dropdownTheme.icon}
                />
                <Text style={dropdownTheme.dropdownText}>{t(label)}</Text>
              </View>
              <Text style={dropdownTheme.dropdownValue}>
                {value || t("choose")}
              </Text>
            </View>
            <View style={dropdownTheme.arrowIconContainer}>
              <Icon name="chevron-down" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>
      }
    >
      {/* Map the items to menu items */}
      {items.map((item) => (
        <Menu.Item
          key={item.value}
          title={item.label}
          onPress={() => {
            setValue(item.value);
            closeMenu();
          }}
        />
      ))}
    </Menu>
  );
};

export default DropdownInput;
