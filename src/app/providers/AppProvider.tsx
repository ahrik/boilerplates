import { PropsWithChildren } from 'react';
import { ComposeChildren } from '@shared/lib/react';
import { ToastProvider } from '@shared/lib/toasts';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ComposeChildren>
      <ToastProvider />
      {children}
    </ComposeChildren>
  );
}
