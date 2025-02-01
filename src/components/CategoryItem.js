import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// CategoryItem component definition
const CategoryItem = ({
  id,
  categoryName,
  categoryType,
  iconName,
  iconColor,
  onEdit,
  onDelete,
  style,
}) => {
  // Get translation, theme and style overrides
  const { t } = useTranslation();
  const theme = useTheme();
  const categoryItemTheme = theme.components.CategoryItem.styleOverrides;

  // Function to handle edit action
  const handleEdit = () => {
    onEdit(id);
  };

  // Function to handle delete action
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    // Main container for the category item
    <View style={[categoryItemTheme.container, style]}>
      {/* Icon Container with color */}
      <View
        style={{
          ...categoryItemTheme.iconContainer,
          backgroundColor: iconColor + "40",
        }}
      >
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
      {/* Text Container with category data */}
      <View style={categoryItemTheme.textContainer}>
        <Text style={categoryItemTheme.categoryName}>{categoryName}</Text>
        <Text style={categoryItemTheme.categoryType}>
          {categoryType == "income"
            ? t("categoryItem.income")
            : t("categoryItem.expense")}
        </Text>
      </View>
      {/* Edit Button container */}
      <TouchableOpacity
        style={categoryItemTheme.editButton}
        onPress={handleEdit}
      >
        <Icon name="pencil" style={categoryItemTheme.icon} size={24} />
      </TouchableOpacity>
      {/* Delete button container */}
      <TouchableOpacity
        style={categoryItemTheme.deleteButton}
        onPress={handleDelete}
      >
        <Icon name="close" style={categoryItemTheme.icon} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;
