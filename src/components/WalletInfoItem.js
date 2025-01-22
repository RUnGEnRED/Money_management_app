import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const WalletInfoItem = ({ wallet }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const walletInfoItemStyles = theme.components.WalletInfoItem.styleOverrides;

  return (
    <View key={wallet.id} style={walletInfoItemStyles.walletInfoItem}>
      <View style={walletInfoItemStyles.textContainer}>
        <Text style={walletInfoItemStyles.totalBalanceText}>
          {t("homeScreen.totalBalance")}
        </Text>
        <Text style={walletInfoItemStyles.balanceText}>
          $ {wallet.balance.toLocaleString()}
        </Text>
        <Text style={walletInfoItemStyles.walletNameText}>{wallet.name}</Text>
      </View>
      <View style={walletInfoItemStyles.iconContainer}>
        <FontAwesome
          name={wallet.icon}
          size={40}
          color={theme.colors.tabColorFocused}
        />
      </View>
    </View>
  );
};

export default WalletInfoItem;
