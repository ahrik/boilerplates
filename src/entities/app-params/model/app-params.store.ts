import { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { create } from '@shared/lib/zustand';
import { AppParamsStoreActions, AppParamsStoreState } from './types';

type AppParamsStore = AppParamsStoreActions & AppParamsStoreState;

const appParamsStoreSlice: StateCreator<
  AppParamsStore,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  appParams: {},
  hydrated: false,

  setTheme: (theme) =>
    set(
      (state) => ({
        appParams: { ...(state.appParams ?? {}), theme },
      }),
      false,
      'appParams/setTheme'
    ),

  removeAppTheme: () =>
    set((s) => {
      const next = { ...s.appParams };
      delete next.theme;
      return { appParams: next };
    }, false, 'appParams/removeTheme'),

  setHydrated: (v) => set({ hydrated: v }, false, 'appParams/setHydrated'),
});

export const useAppParamsStore = create<AppParamsStore>()(
  devtools(
    persist(appParamsStoreSlice, {
      name: 'appParams',
      version: 1,
      partialize: (state) => ({ appParams: state.appParams }),
    }),
    { name: 'appParamsStore' }
  )
);

