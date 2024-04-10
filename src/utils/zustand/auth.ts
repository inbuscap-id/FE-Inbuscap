import { jwtDecode } from "jwt-decode";
import { type StateCreator } from "zustand";

import { ITokenData, LoginPayload } from "../types/api";
import { TUser } from "../apis/users/type";

interface IsAdmin {
  is_admin: boolean;
}

export interface AuthStore {
  token: string;
  user: TUser | null;
  decodedToken: ITokenData | IsAdmin;
  setUser: (dataUser: TUser) => void;
  addAuth: (data: LoginPayload) => void;
  resetAuth: () => void;
}

export const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  token: localStorage.getItem("token") ?? "",
  user: null,
  decodedToken: jwtDecode<ITokenData>(localStorage.getItem("token")!) ?? {
    is_admin: false,
  },
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
});
