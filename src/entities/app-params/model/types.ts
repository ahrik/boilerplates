import { Language } from '@shared/constants';
import { Theme } from '@shared/theme';

export type AppParams = {
  language?: Language;
  theme?: Theme;
};

export type AppParamsStoreState = {
  appParams: AppParams;
  hydrated: boolean
};

export type AppParamsStoreActions = {
  setTheme: (theme: Theme) => void;
  removeAppTheme: () => void;
  setHydrated: (v: boolean) => void;
};
