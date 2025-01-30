import AxiosInstance from "../../api/AxiosInstance";
import { getAuthToken } from "../Auth/AuthService";

const getCategories = async (t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("categoryService.messageNoAuth"));
    }
    const response = await AxiosInstance.get(`/categories?user_id=${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(t("categoryService.errorFetchCategories") + error.message);
  }
};

const deleteCategory = async (id, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    await AxiosInstance.delete(`/categories/${id}`, {
      params: { user_id: user.id },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error(t("categoriesScreen.deleteCategoryError") + error.message);
  }
};

const addCategory = async (name, type, icon, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }

    const categoryData = {
      name: name,
      type: type,
      icon: icon,
      user_id: user.id,
    };
    const response = await AxiosInstance.post(`/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error(t("addCategoryScreen.addCategoryError") + error.message);
  }
};

const updateCategory = async (id, name, type, icon, t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }

    const categoryData = {
      name: name,
      type: type,
      icon: icon,
      user_id: user.id,
    };
    const response = await AxiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error(
      t("editCategoryScreen.updateCategoryError") + error.message
    );
  }
};

export { getCategories, deleteCategory, addCategory, updateCategory };
