import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Menu, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const DropdownInput = ({
  label,
  iconName,
  selectedValue,
  onValueChange,
  items,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const dropdownTheme = theme.components.DropdownInput.styleOverrides;

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
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
                {selectedValue || t("choose")}
              </Text>
            </View>
            <View style={dropdownTheme.arrowIconContainer}>
              <Icon name="chevron-down" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>
      }
    >
      {items.map((item) => (
        <Menu.Item
          key={item.value}
          title={item.label}
          onPress={() => {
            onValueChange(item.value);
            closeMenu();
          }}
        />
      ))}
    </Menu>
  );
};

export default DropdownInput;
