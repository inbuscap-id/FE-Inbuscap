import { type StateCreator } from "zustand";

import { IResponseData, LoginPayload } from "../types/api";
import { TUser } from "../apis/users/type";

export interface AuthStore {
  token: string;
  user: IResponseData<TUser> | null;
  setUser: (user: IResponseData<TUser>) => void;
  addAuth: (data: LoginPayload) => void;
  resetAuth: () => void;
}

export const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  token: localStorage.getItem("token") ?? "",
  user: null,
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
