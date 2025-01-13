import axios from "../../api/AxiosInstance";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

const USER_STORAGE_KEY = "userInfo";

// TODO: Add correct authentication logic for login and register e.g. using axios, via context, using SecureStore and JWT scheme
const login = async (username, password, t) => {
  try {
    console.log(
      `Making request to login with username: ${username} and password: ${password}`
    );

    const result = await axios.get("/users", {
      params: { username, password },
    });

    console.log("Result received:", result.data);

    if (result.data.length > 0) {
      const user = result.data[0];
      if (user.username === username && user.password === password) {
        await SecureStore.setItemAsync(
          USER_STORAGE_KEY,
          JSON.stringify({ username, password })
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

    const checkResult = await axios.get("/users", {
      params: { username },
    });

    if (checkResult.data.length > 0) {
      return { success: false, message: t("authService.messageUserExists") };
    }

    console.log(
      `Making request to register with username: ${username} and password: ${password}`
    );

    const id = uuidv4();

    const registerResult = await axios.post("/users", {
      user_id: id,
      username: username,
      password: password,
      email: email,
      wallets: [],
      categories: [],
    });

    console.log("Result received:", registerResult.data);

    await SecureStore.setItemAsync(
      USER_STORAGE_KEY,
      JSON.stringify({ username, password })
    );

    return { success: true, user: registerResult.data };
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
