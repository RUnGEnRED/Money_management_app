import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Snackbar } from "react-native-paper";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";
import ShakeDetector from "../../components/ShakeDetector";
import WalletList from "../../components/WalletList";

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [walletList, setWalletList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchWallets = useCallback(async () => {
    setLoading(true);

    try {
      const user = await getAuthToken();
      if (user && user.id) {
        const response = await axios.get(`/wallets?user_id=${user.id}`);
        console.log("Wallets response: ", response.data);
        setWalletList(response.data);
      }
    } catch (error) {
      console.error("Wallets fetch error: ", error);
      setSnackbarMessage(t("homeScreen.errorFetchWallets"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    fetchWallets();
  }, [isFocused, fetchWallets]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWallets();
  }, [fetchWallets]);

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  return (
    <>
      <ShakeDetector targetScreen={"Transaction"} navigation={navigation} />
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.scrollView}
        >
          {!loading && <WalletList walletList={walletList} />}
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={handleSnackbarDismiss}
          duration={6000}
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  scrollContainer: {
    width: "100%", // Scroll content width
    alignItems: "center",
    paddingBottom: 20, // Add some bottom padding for long lists
  },
  scrollView: {
    flex: 1, // Ensure the ScrollView takes up available space
    width: "100%",
  },
});

export default HomeScreen;
