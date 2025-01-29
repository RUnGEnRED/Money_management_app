import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Snackbar } from "react-native-paper";

import ShakeDetector from "../../components/ShakeDetector";
import WalletInfoItem from "../../components/WalletInfoItem";

import useWallets from "../../hooks/Home/useWallets";

const HomeScreen = ({ navigation }) => {
  const {
    walletList,
    loading,
    refreshing,
    snackbarVisible,
    snackbarMessage,
    setSnackbarVisible,
    onRefresh,
    handleSnackbarDismiss,
  } = useWallets();

  return (
    <>
      <ShakeDetector targetScreen={"Transaction"} navigation={navigation} />
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!loading &&
            walletList.map((wallet) => (
              <WalletInfoItem key={wallet.id} wallet={wallet} />
            ))}
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={handleSnackbarDismiss}
          duration={3000}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f5f5f5",
  },
});

export default HomeScreen;
