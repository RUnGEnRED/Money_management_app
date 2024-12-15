import axiosInstance from '../../api/AxiosInstance';
import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

const register = async (email, password) => {
  try {
    console.log(`Making request to check if email ${email} already exists.`);
    const checkResponse = await axiosInstance.get('users', {
      params: { email }
    });

    if (checkResponse.data.length > 0) {
      return { success: false, message: 'Email już istnieje.' };
    }

    console.log(`Making request to register with email: ${email}`);
    const registerResponse = await axiosInstance.post('users', {
      email,
      password,
      // For simplicity, using email as name
      name: email,
      // Default avatar URL
      avatarUrl: 'https://via.placeholder.com/150',
    });

    console.log('Response received:', registerResponse.data);

    // Check if the response contains an authorization token
    if (registerResponse.data.authToken) {
      await SecureStore.setItemAsync(AUTH_TOKEN_STORAGE_KEY, registerResponse.data.authToken)
        .catch(error => console.error('Error storing auth token:', error));
    }

    return { success: true, user: registerResponse.data };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Błąd podczas rejestracji.' };
  }
};

export default register;
