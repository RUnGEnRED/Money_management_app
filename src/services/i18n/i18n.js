import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../../locales/en.json";
import pl from "../../../locales/pl.json";

// Define the language resources
export const languageResources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

// Initialize the i18n instance
i18n.use(initReactI18next).init({
  resources: languageResources,
  lng: "en",
  fallbackLng: "en",
  keySeparator: ".",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
