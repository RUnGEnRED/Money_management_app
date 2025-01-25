import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  const theme = useTheme();
  const categoryItemTheme = theme.components.CategoryItem.styleOverrides;

  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <View style={[categoryItemTheme.container, style]}>
      <View
        style={{
          ...categoryItemTheme.iconContainer,
          backgroundColor: iconColor + "40",
        }}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
      <View style={categoryItemTheme.textContainer}>
        <Text style={categoryItemTheme.categoryName}>{categoryName}</Text>
        <Text style={categoryItemTheme.categoryType}>{categoryType}</Text>
      </View>
      <TouchableOpacity
        style={categoryItemTheme.editButton}
        onPress={handleEdit}>
        <Icon name='pencil' style={categoryItemTheme.icon} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={categoryItemTheme.deleteButton}
        onPress={handleDelete}>
        <Icon name='close' style={categoryItemTheme.icon} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;
