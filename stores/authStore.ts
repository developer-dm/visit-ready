import { AuthStore } from "@/types/models";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const isWeb = Platform.OS === "web";

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      hasCompletedOnboarding: false,
      isVip: false,
      _hasHydrated: false,

      logIn: () =>
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
          };
        }),

      logInAsVip: () =>
        set((state) => {
          return {
            ...state,
            isVip: true,
            isLoggedIn: true,
          };
        }),

      logOut: () =>
        set((state) => {
          return {
            ...state,
            isVip: false,
            isLoggedIn: false,
          };
        }),

      completeOnboarding: () =>
        set((state) => {
          return {
            ...state,
            hasCompletedOnboarding: true,
          };
        }),

      resetOnboarding: () =>
        set((state) => {
          return {
            ...state,
            hasCompletedOnboarding: false,
          };
        }),

      setHasHydrated: (value: boolean) =>
        set((state) => {
          return {
            ...state,
            _hasHydrated: value,
          };
        }),
    }),
    {
      name: "auth-store",
      storage: isWeb
        ? createJSONStorage(() => localStorage)
        : createJSONStorage(() => ({
          setItem: (key: string, value: string) =>
            SecureStore.setItemAsync(key, value),
          getItem: (key: string) => SecureStore.getItemAsync(key),
          removeItem: (key: string) => SecureStore.deleteItemAsync(key),
        })),
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true);
        };
      },
    },
  ),
);
