import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WalletItem = ({
  id,
  walletName,
  iconName,
  iconColor,
  onEdit,
  onDelete,
  style,
}) => {
  const theme = useTheme();
  const walletItemStyles = theme.components.WalletItem.styleOverrides;

  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <View style={[walletItemStyles.container, style]}>
      <View
        style={{
          ...walletItemStyles.iconContainer,
          backgroundColor: iconColor + "40",
        }}
      >
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
      <View style={walletItemStyles.textContainer}>
        <Text style={walletItemStyles.walletName}>{walletName}</Text>
      </View>
      <TouchableOpacity
        style={walletItemStyles.editButton}
        onPress={handleEdit}
      >
        <Icon name="pencil" style={walletItemStyles.icon} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={walletItemStyles.deleteButton}
        onPress={handleDelete}
      >
        <Icon name="close" style={walletItemStyles.icon} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default WalletItem;
