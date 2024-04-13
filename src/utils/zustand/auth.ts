import { jwtDecode } from "jwt-decode";
import { type StateCreator } from "zustand";
import { ITokenData, LoginPayload } from "../types/api";
import { TUser } from "../apis/users/type";

export interface AuthStore {
  token: string | null;
  user: TUser | null;
  decodedToken: ITokenData | null;
  setUser: (dataUser: TUser) => void;
  addAuth: (data: LoginPayload) => void;
  resetAuth: () => void;
}

export const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  token: localStorage.getItem("token") || null,
  user: null,
  decodedToken: null,
  setUser: (user) => set({ user }),
  addAuth: (data) => {
    try {
      const decodedToken = jwtDecode<ITokenData>(data.token);
      set(() => ({
        token: data.token,
        decodedToken,
      }));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  },
  resetAuth: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, decodedToken: null });
  },
});
