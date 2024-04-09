import { type StateCreator } from "zustand";

import { LoginPayload } from "../types/api";
import { TUser } from "../apis/users/type";

export interface AuthStore {
  token: string;
  user: TUser | null;
  isAdmin: boolean | null;
  setUser: (dataUser: TUser) => void;
  addAuth: (data: LoginPayload) => void;
  resetAuth: () => void;
  setIsAdmin: (data: boolean) => void;
}

export const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  token: localStorage.getItem("token") ?? "",
  user: null,
  isAdmin: null,
  setUser: (user) => set({ user }),
  addAuth: (data) =>
    set(() => {
      localStorage.setItem("token", data.token);
      return { token: data.token };
    }),
  resetAuth: () =>
    set(() => {
      localStorage.clear();
      return { token: "" };
    }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
});
