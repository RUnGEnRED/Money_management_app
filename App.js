import React from "react";

import { PaperProvider } from "react-native-paper";
import theme from "./src/theme/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/services/i18n/i18n";
// import { UserProvider } from "./src/context/UserContext";
// import ShakeDetector from "./src/components/ShakeDetector";

import MainNavigation from "./src/routes/MainNavigator";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme.light}>
        <MainNavigation />
      </PaperProvider>
    </I18nextProvider>
  );
}
