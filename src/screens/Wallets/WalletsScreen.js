import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import axios from "../../api/AxiosInstance";
import { getAuthToken } from "../../services/Auth/AuthService";

import WalletItem from "../../components/WalletItem";
import CustomButton from "../../components/CustomButton";

const WalletsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  // Stan portfeli i innych zmiennych
  const [walletList, setWalletList] = useState([]); // Lista portfeli z bazy danych
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pobieranie danych z API
  const fetchData = useCallback(async () => {
    try {
      const user = await getAuthToken();
      if (user && user.id) {
        const response = await axios.get(`/wallets?user_id=${user.id}`); // Pobieranie danych portfeli
        setWalletList(response.data); // Ustawianie danych w stanie
      } else {
        throw new Error("User is not authenticated or invalid token.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSnackbarMessage(t("homeScreen.errorFetchWallets"));
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  const deleteWallet = async (id) => {
    try {
      const user = await getAuthToken();
      if (user && user.id) {
        await axios.delete(`/wallets/${id}?user_id=${user.id}`);
        setSnackbarMessage(t("Wallet deleted successfully"));
        setSnackbarVisible(true);

        fetchData();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setSnackbarMessage(t("Category delete failed"));
      setSnackbarVisible(true);
    }
  };

  // Efekt wywołania przy załadowaniu ekranu
  useEffect(() => {
    fetchData();
  }, [isFocused, fetchData]);

  // Odświeżanie listy
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // Obsługa zamknięcia powiadomienia Snackbar
  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  // Funkcje do edytowania i usuwania portfeli
  const handleEditWallet = (id) => {
    console.log(`Edit wallet with ID: ${id}`);
  };

  // Render
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size='large' />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Wyświetlanie listy portfeli */}
        {!loading &&
          walletList.map((wallet) => (
            <WalletItem
              key={wallet.id}
              id={wallet.id}
              walletName={wallet.name} // Zakładam, że API zwraca nazwę portfela w polu "name"
              iconName={wallet.icon} // Zakładam, że API zwraca ikonę w polu "icon"
              iconColor={wallet.color || "#339933"} // Zakładam, że API zwraca kolor w polu "color"
              onEdit={() =>
                navigation.navigate("Edit Wallet", {
                  walletId: wallet.id,
                  walletName: wallet.name,
                  walletBalance: wallet.balance,
                  iconName: wallet.icon,
                })
              }
              onDelete={deleteWallet}
              style={{ marginBottom: 10 }}
            />
          ))}

        {/* Przycisk do dodawania portfela */}
        <CustomButton
          style={styles.addButton}
          mode='contained'
          onPress={() => navigation.navigate("Add New Wallet")}
          icon='database'>
          {t("test.add")}
        </CustomButton>
      </ScrollView>

      {/* Snackbar z informacjami o błędach */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={6000}>
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
