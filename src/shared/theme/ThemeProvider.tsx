import { PropsWithChildren, useEffect, useState } from 'react';
import { Theme, ThemeContext } from './themeContext';
import { getSystemTheme } from './utils';

type Props = PropsWithChildren & {
  defaultTheme?: Theme;
};

export const ThemeProvider = ({ children, defaultTheme }: Props) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme || getSystemTheme());

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
