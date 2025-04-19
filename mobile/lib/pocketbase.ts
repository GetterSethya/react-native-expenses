import eventSource from "react-native-sse";
import Pocketbase, { AsyncAuthStore } from "pocketbase";
import { BACKEND_URL } from "./constants";
import * as SecureStore from "expo-secure-store";

global.EventSource = eventSource as unknown as typeof EventSource;

const authKey = "pb_auth";
const store = new AsyncAuthStore({
  save: async (serialized) => SecureStore.setItem(authKey, serialized),
  initial: SecureStore.getItemAsync(authKey),
});

export const pb = new Pocketbase(BACKEND_URL, store);
