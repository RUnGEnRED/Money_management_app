import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

// Import custom hook for currency format
import useCurrency from "../hooks/useCurrency";

// WalletInfoItem component definition
const WalletInfoItem = ({ wallet }) => {
  // Get translation, currency, theme and styles
  const { t } = useTranslation();
  const currency = useCurrency();
  const theme = useTheme();

  // Get styling overrides from the theme
  const walletInfoItemStyles = theme.components.WalletInfoItem.styleOverrides;

  return (
    // Render the wallet info item with wallet details and icon
    <View key={wallet.id} style={walletInfoItemStyles.walletInfoItem}>
      <View style={walletInfoItemStyles.textContainer}>
        <Text style={walletInfoItemStyles.totalBalanceText}>
          {t("walletInfoItem.totalBalance")}
        </Text>
        <Text style={walletInfoItemStyles.balanceText}>
          {currency} {wallet.balance.toLocaleString()}
        </Text>
        <Text style={walletInfoItemStyles.walletNameText}>{wallet.name}</Text>
      </View>
      <View style={walletInfoItemStyles.iconContainer}>
        <Icon
          name={wallet.icon}
          size={40}
          color={theme.colors.tabColorFocused}
        />
      </View>
    </View>
  );
};

export default WalletInfoItem;
