// Import the API instance and authentication token service
import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

// Function to fetch categories from the API
const getCategories = async (t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    // Make the request to get categories
    const response = await AxiosInstance.get(`/categories?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching categories:", error);
    throw new Error(t("categoryService.errorFetchCategories") + error.message);
  }
};

// Function to delete a category from the API
const deleteCategory = async (id, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    // Make the API call to delete category
    await AxiosInstance.delete(`/categories/${id}`, {
      params: { user_id: user.id },
    });
    // Delete transactions from that wallet
    await deleteTransactionsByCategoryId(id, t);
  } catch (error) {
    // Handle errors
    console.error("Error deleting category:", error);
    throw new Error(t("categoryService.deleteCategoryError") + error.message);
  }
};

// Function to delete transactions of a certain category id from the API
const deleteTransactionsByCategoryId = async (categorId, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    // Make the api call to get transactions from a specific wallet
    const response = await AxiosInstance.get(
      `/transactions?user_id=${user.id}&categorie_id=${categorId}`
    );
    const transactions = response.data;
    // Loop through the transactions and delete them
    for (const transaction of transactions) {
      await AxiosInstance.delete(`/transactions/${transaction.id}`, {
        params: { user_id: user.id },
      });
    }
  } catch (error) {
    // If any errors occur log it and throw a new error
    console.error("Error deleting transactions by wallet:", error);
    throw new Error(
      t("categoryService.deleteTransactionsError") + error.message
    );
  }
};

// Function to add a new category to the API
const addCategory = async (name, type, icon, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    // Prepare the category data
    const categoryData = {
      name: name,
      type: type,
      icon: icon,
      user_id: user.id,
    };
    // Make the API call to add the new category
    const response = await AxiosInstance.post(`/categories`, categoryData);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error adding category:", error);
    throw new Error(t("categoryService.addCategoryError") + error.message);
  }
};

// Function to update a category using the API
const updateCategory = async (id, name, type, icon, t) => {
  try {
    // Get the auth token
    const user = await getAuthToken();
    // Check if user is authenticated
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    // Prepare the category data
    const categoryData = {
      name: name,
      type: type,
      icon: icon,
      user_id: user.id,
    };
    // Make the API call to update the category
    const response = await AxiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error updating category:", error);
    throw new Error(t("categoryService.updateCategoryError") + error.message);
  }
};

// Export the functions
export { getCategories, deleteCategory, addCategory, updateCategory };
