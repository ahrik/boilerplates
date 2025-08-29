import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const useDetectChangeSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<Theme | undefined>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return 'light'; // по дефолту светлая тема
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? e.matches : mql.matches;
      setSystemTheme(matches ? 'dark' : 'light');
    };

    onChange(mql);

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);

      return () => mql.removeEventListener('change', onChange);
    }
  }, []);

  return { systemTheme };
};
