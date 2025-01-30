import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";

import AxiosInstance from "../../api/AxiosInstance";

const USER_STORAGE_KEY = "userInfo";

const loginUser = async (username, password, t) => {
  try {
    console.log(
      `Making request to login with username: ${username} and password: ${password}`
    );

    const response = await AxiosInstance.get("/users", {
      params: { username, password },
    });

    console.log("Login response received:", response.data);

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

const registerUser = async (username, password, t) => {
  try {
    console.log(
      `Making request to check if username ${username} already exists.`
    );

    const checkResponse = await AxiosInstance.get("/users", {
      params: { username },
    });

    if (checkResponse.data.length > 0) {
      return { success: false, message: t("authService.messageUserExists") };
    }

    console.log(
      `Making request to register with username: ${username} and password: ${password}`
    );

    const createResponse = await AxiosInstance.post("/users", {
      username: username,
      password: password,
    });
    const createdUserId = createResponse.data.id;

    console.log("Register response received:", createResponse.data);

    await AxiosInstance.post("/wallets", {
      name: "Wallet",
      icon: "wallet",
      balance: 0,
      user_id: createdUserId,
    });

    const categoriesData = [
      {
        name: "Salary",
        type: "income",
        icon: "cash",
      },
      {
        name: "Saving",
        type: "income",
        icon: "piggy-bank",
      },
      {
        name: "Food",
        type: "expense",
        icon: "food",
      },
      {
        name: "Transport",
        type: "expense",
        icon: "car",
      },
    ];

    const categoryPromises = categoriesData.map(async (category) => {
      return AxiosInstance.post("/categories", {
        name: category.name,
        type: category.type,
        icon: category.icon,
        user_id: createdUserId,
      });
    });

    await Promise.all(categoryPromises);

    await SecureStore.setItemAsync(
      USER_STORAGE_KEY,
      JSON.stringify({
        id: createdUserId,
        username: username,
        password: password,
      })
    );

    return { success: true, user: createResponse.data };
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
  loginUser,
  registerUser,
  getUserInfo as getAuthToken,
  removeUserInfo as removeAuthToken,
};
