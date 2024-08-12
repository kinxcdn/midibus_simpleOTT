import axios from 'axios';
import {storage} from '../constants/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAuthToken() {
  const value = await storage.getString('authKey');
  return value;
}

export const authAxios = axios.create({
  baseURL: `https://api-v2.midibus.dev-kinxcdn.com`,
});

authAxios.interceptors.request.use(async config => {
  const _authKey = await getAuthToken();
  if (_authKey) {
    config.headers['X-Mbus-Token'] = _authKey;
  }

  return config;
});
