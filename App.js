import React from "react";
import { PaperProvider } from "react-native-paper";
import theme from "./src/theme/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/services/i18n/i18n";

// import { UserProvider } from "./src/context/UserContext";
import AppNavigation from "./src/routes/AppNavigation";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <AppNavigation />
      </I18nextProvider>
    </PaperProvider>
  );
}
