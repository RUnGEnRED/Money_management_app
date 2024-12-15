# MyPennys - Mobile Finance Tracker App

This is a mobile application built with React Native to help users track their personal finances. It allows users to manage multiple wallets (Credit Card, Bank, Cash), add transactions, transfer funds between wallets, and analyze financial history.

## Features

- **Multi-Wallet Support:** Manage multiple accounts including Credit Card, Bank, and Wallet.
- **Transaction Tracking:** Easily record income and expenses.
- **Fund Transfers:** Move money seamlessly between your wallets.
- **Transaction History:** View a detailed history of your transactions.
- **Financial Reports:** Analyze your finances with informative charts and graphs.
- **Customizable Categories:** Add your own transaction categories.
- **Settings:** Configure app preferences, currency, and language.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>=16)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- Android Studio (for Android) or Xcode (for iOS) (for running on simulators/devices)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RUnGEnRED/Money_management_app.git
   cd Money_management_app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npx react-native start
   ```

4. **Run the app on your device or emulator:**

   For Android:

   ```bash
   npx react-native run-android
   ```

   For iOS:

   ```bash
   npx react-native run-ios
   ```

## Usage

- **Home:** View a summary of all your wallet balances.
- **Transaction:** Add new income or expense transactions.
- **Transfer:** Move funds between your wallets.
- **History:** See a detailed log of all your past transactions.
- **Drawer Navigation (accessible via hamburger menu icon):**
  - **Report:** Visualize your finances using charts and graphs.
  - **Wallets:** Manage your wallets (edit or add new ones).
  - **Categories:** Manage your transaction categories.
  - **Settings:** Configure the app preferences.

## License

This project is licensed under the [MIT License](LICENSE).
