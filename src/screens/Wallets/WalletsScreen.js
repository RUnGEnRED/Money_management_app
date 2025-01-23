import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import WalletItem from "../../components/WalletItem";
import CustomButton from "../../components/CustomButton";

const WalletsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const [categoryExpenseList, setCategoryExpenseList] = useState([]);
  const [categoryIncomeList, setCategoryIncomeList] = useState([]);
  const [walletList, setWalletList] = useState([]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [selectedCategory, setSelectedCategory] = useState("Choose");
  const [selectedWallet, setSelectedWallet] = useState("Choose");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Set your data here
      // setCategoryIncomeList([...]); // Replace with actual data
      // setWalletList([...]); // Replace with actual data
    } catch (error) {
      console.error("Data fetch error: ", error);
      setSnackbarMessage(t("homeScreen.errorFetchWallets"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // TEST TO DELETE TRANSACTIONS
  const [wallets, setWallets] = useState([
    {
      id: 1,
      walletName: "Credit Card",
      iconName: "credit-card",
      iconColor: "#339933",
    },
    { id: 2, walletName: "Cash", iconName: "cash", iconColor: "#339933" },
    {
      id: 3,
      walletName: "Bank Account",
      iconName: "bank",
      iconColor: "#339933",
    },
  ]);
  const handleEditWallet = (id) => {
    console.log(`Edit wallet with ID: ${id}`);
  };
  const handleDeleteWallet = (id) => {
    setWallets(wallets.filter((wallet) => wallet.id !== id));
  };
  // TEST END

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading &&
          wallets.map((wallet) => (
            <WalletItem
              key={wallet.id}
              id={wallet.id}
              walletName={wallet.walletName}
              iconName={wallet.iconName}
              iconColor={wallet.iconColor}
              onEdit={handleEditWallet}
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
          {t("test.add")}
        </CustomButton>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={6000}
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
