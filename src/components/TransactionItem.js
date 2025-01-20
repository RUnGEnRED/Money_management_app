import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TransactionItem = ({
  id,
  categoryName,
  walletName,
  date,
  amount,
  iconName,
  iconColor,
  onDelete,
  style,
}) => {
  const theme = useTheme();
  const transactionItemTheme = theme.components.TransactionItem.styleOverrides;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <View style={[transactionItemTheme.container, style]}>
      <Text style={transactionItemTheme.date}>{date}</Text>
      <View
        style={{
          ...transactionItemTheme.iconContainer,
          backgroundColor: iconColor + "40",
        }}
      >
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
      <View style={transactionItemTheme.textContainer}>
        <Text style={transactionItemTheme.categoryName}>{categoryName}</Text>
        <Text style={transactionItemTheme.walletName}>{walletName}</Text>
      </View>
      <Text
        style={[
          transactionItemTheme.amount,
          { color: amount < 0 ? "red" : "green" },
        ]}
      >
        {amount > 0 ? "+ $" : "- $"}
        {Math.abs(amount)}
      </Text>
      <TouchableOpacity
        style={transactionItemTheme.deleteButton}
        onPress={handleDelete}
      >
        <Icon name="close" style={transactionItemTheme.deleteIcon} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default TransactionItem;
