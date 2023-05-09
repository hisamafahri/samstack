import * as SecureStore from "expo-secure-store";
import { SECURE_STORE_KEY } from "@/utils/constants";

export const saveToSecureStore = async (
  key: SECURE_STORE_KEY,
  value: string
) => {
  await SecureStore.setItemAsync(key, value);
};

export const removeFromSecureStore = async (key: SECURE_STORE_KEY) => {
  await SecureStore.deleteItemAsync(key);
};

export const getValueFromSecureStore = async (key: SECURE_STORE_KEY) => {
  const result = await SecureStore.getItemAsync(key);

  if (!result) return null;
  return result;
};
