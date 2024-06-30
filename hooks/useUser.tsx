import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export type UserType = {
  name: string;
  email: string;
  image: string;
};

type UseUserType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

export const useUser = create<UseUserType>((set) => ({
  user: SecureStore.getItem("user")
    ? JSON.parse(SecureStore.getItem("user") as string)
    : null,
  setUser: (user) => {
    set({ user });
  },
}));
