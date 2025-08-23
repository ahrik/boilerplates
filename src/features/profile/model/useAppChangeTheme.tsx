import { useAppSettings } from '@entities/app-params';
import { useDetectChangeSystemTheme, useTheme } from '@shared/theme';

export const useAppChangeTheme = () => {
  const { setAppTheme, theme, removeAppTheme } = useAppSettings();
  const { systemTheme } = useDetectChangeSystemTheme();
  const { setTheme } = useTheme();

  const setLightTheme = () => {
    setAppTheme('light');
  };

  const setDarkTheme = () => {
    setAppTheme('dark');
  };

  const setSystemTheme = () => {
    removeAppTheme();

    console.log({ systemTheme });

    if (systemTheme) {
      setTheme(systemTheme);
    }
  };

  return {
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    theme,
  };
};
