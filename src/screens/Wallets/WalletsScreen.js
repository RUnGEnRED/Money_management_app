import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import WalletItem from "../../components/WalletItem";
import CustomButton from "../../components/CustomButton";

import useWalletData from "../../hooks/Wallets/useWalletData";

const WalletsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    walletList,
    loading,
    refreshing,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    onRefresh,
    deleteWallet: handleDeleteWallet,
    handleEditWallet,
    handleSnackbarDismiss,
  } = useWalletData();

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading &&
          walletList.map((wallet) => (
            <WalletItem
              key={wallet.id}
              id={wallet.id}
              walletName={wallet.name}
              iconName={wallet.icon}
              iconColor={wallet.color || "#339933"}
              onEdit={() => handleEditWallet(wallet)}
              onDelete={handleDeleteWallet}
              style={{ marginBottom: 10 }}
            />
          ))}

        <CustomButton
          style={styles.addButton}
          mode="contained"
          onPress={() => navigation.navigate("Add New Wallet")}
          icon="database"
        >
          {t("walletsScreen.add")}
        </CustomButton>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    marginTop: 5,
    backgroundColor: "#f5f5f5",
    borderStyle: "dashed",
    borderColor: "#015D01",
    borderWidth: 2,
  },
});

export default WalletsScreen;
