import { create } from "zustand";

import { type AuthStore, authStoreCreator } from "./auth";

export const useAuthStore = create<AuthStore>()(authStoreCreator);
