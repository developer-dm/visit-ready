import { AuthStore } from "@/types/Stores";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const isWeb = Platform.OS === "web";

const createAuthStore = () => ({
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  getItem: (key: string) => SecureStore.getItemAsync(key),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
})

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      // Authentication States
      isLoggedIn: false,
      hasCompletedOnboarding: false,
      isVip: false,
      _hasHydrated: false,
      notifications: false,
      calendar: false,

      // Login Actions
      logIn: () =>
        set((state) => ({
          ...state,
          isLoggedIn: true,
        })),
      logInAsVip: () =>
        set((state) => ({
          ...state,
          isVip: true,
          isLoggedIn: true,
        })),
      logOut: () =>
        set((state) => ({
          ...state,
          isVip: false,
          isLoggedIn: false,
        })),

      // Onboarding Actions
      completeOnboarding: () =>
        set((state) => ({
          ...state,
          hasCompletedOnboarding: true,
        })),
      resetOnboarding: () =>
        set((state) => ({
          ...state,
          hasCompletedOnboarding: false,
          notifications: false,
          calendar: false,
        })),

      // Settings Actions
      setNotifications: (value: boolean) =>
        set((state) => ({
          ...state,
          notifications: value,
        })),
      setCalendar: (value: boolean) =>
        set((state) => ({
          ...state,
          calendar: value,
        })),

      // Utility Actions
      setHasHydrated: (value: boolean) =>
        set((state) => ({
          ...state,
          _hasHydrated: value,
        })),
    }),
    {
      name: "auth-store",
      storage: isWeb
        ? createJSONStorage(() => localStorage)
        : createJSONStorage(() => createAuthStore()),
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true);
        };
      },
    },
  ),
);

export default useAuthStore;

