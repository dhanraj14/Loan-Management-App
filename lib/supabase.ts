import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    console.log(`Getting item with key: ${key}`);
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    console.log(`Setting item with key: ${key}, value: ${value}`);
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    console.log(`Removing item with key: ${key}`);
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://ytzcuxsjxdrmvpvyweuv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0emN1eHNqeGRybXZwdnl3ZXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NjM0MjEsImV4cCI6MjA2MjUzOTQyMX0.sVCdTRriVGhmltmTXrcTXSlQV5MLpYrnX3PubfybFNY";

console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log('Supabase Anon Key:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
