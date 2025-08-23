import { Theme, useTheme } from '@shared/theme';
import { useAppParamsStore } from './app-params.store';

type ReturnType = {
  theme?: Theme;
  removeAppTheme: () => void;
  setAppTheme: (theme: Theme) => void;
};

export const useAppSettings = (): ReturnType => {
  const setStoreTheme = useAppParamsStore(state => state.setTheme);
  const removeStoreTheme = useAppParamsStore(state => state.removeAppTheme);
  const appParams = useAppParamsStore(state => state.appParams);
  const { setTheme } = useTheme();

  const setAppTheme = (userTheme: Theme) => {
    const theme = userTheme;
    setStoreTheme(theme);
    setTheme(theme);
  };

  const removeAppTheme = () => {
    removeStoreTheme();
  }

  return {
    theme: appParams.theme,
    removeAppTheme,
    setAppTheme,
  };
};
