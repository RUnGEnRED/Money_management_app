import axiosInstance from '../../api/AxiosInstance';
import * as SecureStore from 'expo-secure-store';

const login = async (email, password) => {
  try {
    console.log(`Making request to login with email: ${email} and password: ${password}`);
    const response = await axiosInstance.get('users', {
      params: { email, password }
    });

    console.log('Response received:', response.data);

    if (response.data.length > 0) {
      const user = response.data[0];
      // Assuming the user object contains an 'authToken' field
      if (user.authToken) {
        await SecureStore.setItemAsync('authToken', user.authToken);
      }
      return { success: true, user };
    } else {
      return { success: false, message: 'Nieprawidłowy email lub hasło.' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Błąd podczas logowania.' };
  }
};

const getAuthToken = async () => {
  try {
    const authToken = await SecureStore.getItemAsync('authToken');
    return authToken;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

const removeAuthToken = async () => {
  try {
    await SecureStore.deleteItemAsync('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

export { login, getAuthToken, removeAuthToken };
