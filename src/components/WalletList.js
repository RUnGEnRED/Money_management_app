import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const WalletList = ({ walletList }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const walletItemStyles = theme.components.WalletItem.styleOverrides;

  return (
    <>
      {Array.isArray(walletList) &&
        walletList.map((wallet) => (
          <View key={wallet.id} style={walletItemStyles.walletItem}>
            <View style={walletItemStyles.textContainer}>
              <Text style={walletItemStyles.totalBalanceText}>
                {t("homeScreen.totalBalance")}
              </Text>
              <Text style={walletItemStyles.balanceText}>
                $ {wallet.balance.toLocaleString()}
              </Text>
              <Text style={walletItemStyles.walletNameText}>{wallet.name}</Text>
            </View>
            <View style={walletItemStyles.iconContainer}>
              <FontAwesome
                name={wallet.icon}
                size={40}
                color={theme.colors.tabColorFocused}
              />
            </View>
          </View>
        ))}
    </>
  );
};

export default WalletList;
