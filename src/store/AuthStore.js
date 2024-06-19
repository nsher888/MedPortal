import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      profile: null,
      isAuth: false,
      setProfile: (profile) => {
        set(() => ({ profile, isAuth: true }));
      },
      logout: () => {
        set(() => ({ profile: null, isAuth: false }));
      },
    }),
    { name: 'profile' },
  ),
);

export const useSessionVerified = create((set) => ({
  sessionVerified: false,
  setSessionVerified: (isSessionVerified) => {
    set(() => ({ sessionVerified: isSessionVerified }));
  },
}));
