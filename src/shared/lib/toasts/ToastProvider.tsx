import { PropsWithChildren } from 'react';
import { createToaster } from '@ark-ui/react';
import { ToastContext } from './toast-context';

const toaster = createToaster({
  placement: 'top-end',
  overlap: true,
  gap: 24,
  duration: 3000,
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  return <ToastContext.Provider value={toaster}>{children}</ToastContext.Provider>;
};
