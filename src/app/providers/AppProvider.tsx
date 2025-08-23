import { PropsWithChildren } from 'react';
import { AntProvider } from '@shared/lib/antd';
import { ComposeChildren } from '@shared/lib/react';
import { ToastProvider } from '@shared/lib/toasts';
import { useTheme } from '@shared/theme';

export function AppProvider({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  console.log({ theme });

  return (
    <ComposeChildren>
      <AntProvider appTheme={theme} />
      <ToastProvider />
      {children}
    </ComposeChildren>
  );
}
