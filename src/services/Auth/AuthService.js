import axios from "../../api/AxiosInstance";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";

const USER_STORAGE_KEY = "userInfo";

// TODO: Add correct authentication logic for login and register e.g. using axios, via context, using SecureStore and JWT scheme
const login = async (username, password, t) => {
  try {
    console.log(
      `Making request to login with username: ${username} and password: ${password}`
    );

    const response = await axios.get("/users", {
      params: { username, password },
    });

    console.log("Response received:", response.data);

    if (response.data.length > 0) {
      const user = response.data[0];
      if (user.username === username && user.password === password) {
        await SecureStore.setItemAsync(
          USER_STORAGE_KEY,
          JSON.stringify({
            id: user.id,
            username: username,
            password: password,
          })
        );
      }
      return { success: true, user: user };
    } else {
      return { success: false, message: t("authService.messageIncData") };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: t("authService.messageErrorLogin") };
  }
};

const register = async (username, password, email, t) => {
  try {
    console.log(
      `Making request to check if username ${username} already exists.`
    );

    const checkResponse = await axios.get("/users", {
      params: { username },
    });

    if (checkResponse.data.length > 0) {
      return { success: false, message: t("authService.messageUserExists") };
    }

    console.log(
      `Making request to register with username: ${username} and password: ${password}`
    );

    // const registerResult = await axios.post("/users", {
    //   user_id: user_id,
    //   username: username,
    //   password: password,
    //   email: email,
    //   avatar: "../assets/avatars/avatar1.svg",
    //   wallets: [
    //     {
    //       wallet_id: wallet_id, // Generate a unique ID
    //       wallet_name: "Wallet",
    //       balance: 0, // Default balance of 0
    //       wallet_icon: "../assets/wallets/wallet.svg",
    //       transactions: [],
    //     },
    //   ],
    //   categories: [
    //     {
    //       category_id: category_ids[0], // Generate unique IDs
    //       category_name: "Salary",
    //       type: "income",
    //       category_icon: "../assets/categories/salary.svg",
    //     },
    //     {
    //       category_id: category_ids[1],
    //       category_name: "Bonus",
    //       type: "income",
    //       category_icon: "../assets/categories/bonus.svg",
    //     },
    //     {
    //       category_id: category_ids[2],
    //       category_name: "Investment",
    //       type: "income",
    //       category_icon: "../assets/categories/investment.svg",
    //     },
    //     {
    //       category_id: category_ids[3],
    //       category_name: "Food",
    //       type: "expense",
    //       category_icon: "../assets/categories/food.svg",
    //     },
    //     {
    //       category_id: category_ids[4],
    //       category_name: "Transportation",
    //       type: "expense",
    //       category_icon: "../assets/categories/transportation.svg",
    //     },
    //     {
    //       category_id: category_ids[5],
    //       category_name: "Entertainment",
    //       type: "expense",
    //       category_icon: "../assets/categories/entertainment.svg",
    //     },
    //   ],
    // });

    const createdUser = await axios.post("/users", {
      username: username,
      password: password,
      email: email,
      avatar: "../assets/avatars/avatar1.svg",
    });
    const createdUserId = createdUser.data.id;

    const createdWallet = await axios.post("/wallets", {
      name: "Wallet",
      balance: 0,
      icon: "../assets/wallets/wallet.svg",
      user_id: createdUserId,
      transactions: [],
    });

    const categoriesData = [
      {
        name: "Salary",
        type: "income",
        icon: "../assets/categories/salary.svg",
      },
      { name: "Bonus", type: "income", icon: "../assets/categories/bonus.svg" },
      {
        name: "Investment",
        type: "income",
        icon: "../assets/categories/investment.svg",
      },
      { name: "Food", type: "expense", icon: "../assets/categories/food.svg" },
      {
        name: "Transportation",
        type: "expense",
        icon: "../assets/categories/transportation.svg",
      },
      {
        name: "Entertainment",
        type: "expense",
        icon: "../assets/categories/entertainment.svg",
      },
    ];

    const categoryPromises = categoriesData.map(async (category) => {
      return axios.post("/categories", {
        name: category.name,
        type: category.type,
        icon: category.icon,
        user_id: createdUserId,
      });
    });

    await Promise.all(categoryPromises);

    console.log("Result received:", createdUser.data);

    await SecureStore.setItemAsync(
      USER_STORAGE_KEY,
      JSON.stringify({
        id: createdUserId,
        username: username,
        password: password,
      })
    );

    return { success: true, user: createdUser.data };
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: t("authService.messageErrorRegister") };
  }
};

const getUserInfo = async () => {
  try {
    const userInfo = await SecureStore.getItemAsync(USER_STORAGE_KEY);
    return JSON.parse(userInfo);
  } catch (error) {
    console.error("Error retrieving user info:", error);
    return null;
  }
};

const removeUserInfo = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing user info:", error);
  }
};

export {
  login as onLogin,
  register as onRegister,
  getUserInfo as getAuthToken,
  removeUserInfo as removeAuthToken,
};
