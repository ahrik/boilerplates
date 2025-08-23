import { PropsWithChildren, useEffect } from 'react';
import { useAppParamsStore } from '@entities/app-params';
import { useDetectChangeSystemTheme, useTheme } from '@shared/theme';

export function ThemeLoader({ children }: PropsWithChildren) {
  const appParams = useAppParamsStore(state => state.appParams);
  const { systemTheme } = useDetectChangeSystemTheme();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (appParams.theme) {
      setTheme(appParams.theme);
    } else if (systemTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme, appParams.theme]);

  return children;
}
