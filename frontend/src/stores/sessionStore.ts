import { create } from "zustand";
import type { User } from "../utils/DataBaseTypes";

// Global session store (Architecture Doc §5.1.2: "a global store for the current user").
type SessionState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clear: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clear: () => set({ user: null }),
}));
