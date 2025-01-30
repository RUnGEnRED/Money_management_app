import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// WalletItem component definition
const WalletItem = ({
  id,
  walletName,
  iconName,
  iconColor,
  onEdit,
  onDelete,
  style,
}) => {
  // Get theme and style overrides
  const theme = useTheme();
  const walletItemStyles = theme.components.WalletItem.styleOverrides;

  // Function to handle edit action
  const handleEdit = () => {
    onEdit(id);
  };

  // Function to handle delete action
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    // Container for wallet item
    <View style={[walletItemStyles.container, style]}>
      {/* Icon container */}
      <View
        style={{
          ...walletItemStyles.iconContainer,
          backgroundColor: iconColor + "40",
        }}
      >
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
      {/* Container for the name of the wallet */}
      <View style={walletItemStyles.textContainer}>
        <Text style={walletItemStyles.walletName}>{walletName}</Text>
      </View>
      {/* Container for the edit button */}
      <TouchableOpacity
        style={walletItemStyles.editButton}
        onPress={handleEdit}
      >
        <Icon name="pencil" style={walletItemStyles.icon} size={24} />
      </TouchableOpacity>
      {/* Container for the delete button */}
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
