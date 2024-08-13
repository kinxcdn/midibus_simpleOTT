import axios from "axios";
import { storage } from "../constants/storage";

const instance = axios.create({
  baseURL: `https://api-v2.midibus.dev-kinxcdn.com`,
});

export async function getAuthToken() {
  const value = await storage.getString("authKey");
  return value;
}

instance.interceptors.request.use(async (config) => {
  const _authKey = await getAuthToken();
  if (_authKey) {
    config.headers["X-Mbus-Token"] = _authKey;
  }

  return config;
});

export { instance };
