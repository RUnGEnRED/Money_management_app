import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

// IconPicker component definition
const IconPicker = ({ icons, selectedIcon, onIconSelect }) => {
  // Get theme and style overrides
  const theme = useTheme();
  const iconPickerTheme = theme.components.IconPicker.styleOverrides;

  // Function to handle the icon selection
  const handleIconSelect = (icon) => {
    onIconSelect(icon);
  };

  return (
    // Render the icon picker component
    <View style={iconPickerTheme.iconContainer}>
      {/* Container to render rows of icons */}
      <View style={iconPickerTheme.iconRow}>
        {/* Maps through the icons to display a button for each of them */}
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
