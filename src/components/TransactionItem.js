import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import custom hook for currency
import { useCurrencyContext } from "../context/CurrencyContext";

// TransactionItem component definition
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
  // Get currency, theme and style overrides
  const { currency, setCurrency } = useCurrencyContext();
  const theme = useTheme();
  const transactionItemTheme = theme.components.TransactionItem.styleOverrides;

  // Function to handle delete action
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    // Render the container for the transaction item
    <View style={[transactionItemTheme.container, style]}>
      {/* Render the date */}
      <Text style={transactionItemTheme.date}>{date}</Text>
      {/* Icon container with color */}
      <View
        style={{
          ...transactionItemTheme.iconContainer,
          backgroundColor: iconColor + "40",
        }}
      >
        <Icon name={iconName} size={24} color={iconColor} />
      </View>
      {/* Container for transaction texts */}
      <View style={transactionItemTheme.textContainer}>
        <Text style={transactionItemTheme.categoryName}>{categoryName}</Text>
        <Text style={transactionItemTheme.walletName}>{walletName}</Text>
      </View>
      {/* Render the amount */}
      <Text
        style={[
          transactionItemTheme.amount,
          { color: amount < 0 ? "red" : "green" },
        ]}
      >
        {amount > 0 ? `+ ${currency} ` : `- ${currency} `}
        {Math.abs(amount)}
      </Text>
      {/* Delete button container */}
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
