import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";
import ShakeDetector from "../../components/ShakeDetector";
import WalletList from "../../components/WalletList";

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [walletList, setWalletList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const fetchWallets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await getAuthToken();
      if (user && user.id) {
        const response = await axios.get(`/wallets?user_id=${user.id}`);
        console.log("Wallets response: ", response.data);
        setWalletList(response.data);
      }
    } catch (error) {
      console.error("Wallets fetch error: ", error);
      setError(t("homeScreen.errorFetchWallets"));
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ShakeDetector targetScreen={"Transaction"} navigation={navigation} />
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text style={styles.error}>{error}</Text>}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.scrollView}
        >
          {!loading && !error && <WalletList walletList={walletList} />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default HomeScreen;
