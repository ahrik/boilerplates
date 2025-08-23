import { PropsWithChildren } from 'react';
import { ConfigProvider, theme as themeAtnd } from 'antd';
import { theme } from './theme/theme';

type Props = PropsWithChildren & {
  appTheme?: 'light' | 'dark';
};

export function AntProvider({ children, appTheme }: Props) {
  return (
    <ConfigProvider
      csp={{ nonce: 'admin-' }}
      theme={{ algorithm: appTheme === 'light' ? themeAtnd.defaultAlgorithm : themeAtnd.darkAlgorithm, ...theme }}
    >
      {children}
    </ConfigProvider>
  );
}
