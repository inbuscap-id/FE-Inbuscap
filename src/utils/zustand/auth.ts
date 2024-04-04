import { type StateCreator } from "zustand";

import { LoginPayload } from "../types/api";
import { TUser } from "../apis/users/type";

export interface AuthStore {
  token: string;
  user: { email: string; fullname: string } | null;
  setUser: (dataUser: TUser) => void;
  addAuth: (data: LoginPayload) => void;
  resetAuth: () => void;
}

export const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  token: localStorage.getItem("token") ?? "",
  user: null,
  setUser: (dataUser) => {
    const { email, fullname } = dataUser;
    set({ user: { email, fullname } });
    localStorage.setItem("user", JSON.stringify({ email, fullname }));
  },
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
});
