import React from "react"; // Import the React library for creating React components
import { PaperProvider } from "react-native-paper"; // Import PaperProvider for theming from react-native-paper
import { I18nextProvider } from "react-i18next"; // Import I18nextProvider for internationalization from react-i18next

import theme from "./src/theme/theme"; // Import the custom theme object
import i18n from "./src/services/i18n/i18n"; // Import the i18n configuration object for internationalization
import AppNavigation from "./src/routes/AppNavigation"; // Import the root navigation component

// Define the main App component
const App = () => {
  return (
    // Wrap the entire app with PaperProvider to provide theming
    <PaperProvider theme={theme}>
      {/* Wrap the app with I18nextProvider to provide internationalization */}
      <I18nextProvider i18n={i18n}>
        {/* Render the root navigation component */}
        <AppNavigation />
      </I18nextProvider>
    </PaperProvider>
  );
};

export default App;
