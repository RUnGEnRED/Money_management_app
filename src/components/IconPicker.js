import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

const IconPicker = ({ icons, selectedIcon, onIconSelect }) => {
  const theme = useTheme();
  const iconPickerTheme = theme.components.IconPicker.styleOverrides;

  const handleIconSelect = (icon) => {
    onIconSelect(icon);
  };

  return (
    <View style={iconPickerTheme.iconContainer}>
      <View style={iconPickerTheme.iconRow}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={[
              iconPickerTheme.iconBox,
              selectedIcon === icon && iconPickerTheme.selectedIcon,
            ]}
            onPress={() => handleIconSelect(icon)}
          >
            <Icon name={icon} size={30} color="darkgreen" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default IconPicker;
