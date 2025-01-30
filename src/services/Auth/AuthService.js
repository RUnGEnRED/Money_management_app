import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";

// Import the Axios instance
import AxiosInstance from "../../api/AxiosInstance";

// Define the key for storing user information
const USER_STORAGE_KEY = "userInfo";

// Function to handle user login
const loginUser = async (username, password, t) => {
  try {
    // Log the login request details
    console.log(
      `Making request to login with username: ${username} and password: ${password}`
    );

    // Make the request to login user
    const response = await AxiosInstance.get("/users", {
      params: { username, password },
    });

    // Log the login response
    console.log("Login response received:", response.data);

    // Process the login
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

// Function to handle user registration
const registerUser = async (username, password, t) => {
  try {
    // Log the check if username exists
    console.log(
      `Making request to check if username ${username} already exists.`
    );

    // Check if username exists before registering
    const checkResponse = await AxiosInstance.get("/users", {
      params: { username },
    });

    // Handle if user exists
    if (checkResponse.data.length > 0) {
      return { success: false, message: t("authService.messageUserExists") };
    }

    // Log register request details
    console.log(
      `Making request to register with username: ${username} and password: ${password}`
    );

    // Create a new user in the DB
    const createResponse = await AxiosInstance.post("/users", {
      username: username,
      password: password,
    });
    const createdUserId = createResponse.data.id;

    // Log the register user response
    console.log("Register response received:", createResponse.data);

    // Create a default wallet for the new user
    await AxiosInstance.post("/wallets", {
      name: "Wallet",
      icon: "wallet",
      balance: 0,
      user_id: createdUserId,
    });

    // Define default categories for the user
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

    // Create categories for the new user
    const categoryPromises = categoriesData.map(async (category) => {
      return AxiosInstance.post("/categories", {
        name: category.name,
        type: category.type,
        icon: category.icon,
        user_id: createdUserId,
      });
    });

    await Promise.all(categoryPromises);

    // Set user info in secure storage
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

// Function to retrieve user information from secure storage
const getUserInfo = async () => {
  try {
    const userInfo = await SecureStore.getItemAsync(USER_STORAGE_KEY);
    return JSON.parse(userInfo);
  } catch (error) {
    console.error("Error retrieving user info:", error);
    return null;
  }
};

// Function to remove user information from secure storage
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
