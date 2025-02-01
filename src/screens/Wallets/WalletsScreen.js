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

// Import custom components
import WalletItem from "../../components/WalletItem";
import CustomButton from "../../components/CustomButton";

// Import custom hook for managing wallet data
import useWallet from "../../hooks/Wallets/useWallet";

// WalletsScreen component definition
const WalletsScreen = () => {
  // Get translation, navigation and wallet data using custom hook
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
  } = useWallet();

  return (
    // Main container for wallets screen including loading indicator, wallet list and add button
    <View style={styles.container}>
      {/* Loading indicator to be shown while loading the data */}
      {loading && <ActivityIndicator size="large" />}
      {/* ScrollView containing wallet items and the add button */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Map through all the wallets to render a WalletItem component for each one of them */}
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
        {/* Button to navigate to the add wallet screen */}
        <CustomButton
          style={styles.addButton}
          mode="contained"
          onPress={() => navigation.navigate("Add New Wallet")}
          icon="database"
        >
          {t("walletsScreen.add")}
        </CustomButton>
      </ScrollView>
      {/* Snackbar for notifications */}
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
