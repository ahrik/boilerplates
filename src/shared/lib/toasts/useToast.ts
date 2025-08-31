import { useContext } from 'react';
import { createToaster } from '@ark-ui/react';
import { ToastContext } from './toast-context';

type ToastType = 'success' | 'warning' | 'error' | 'info';

type ToastData = Parameters<ReturnType<typeof createToaster>[ToastType]>[0];

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const getToast = (type: ToastType) => (data: ToastData) => {
    context[type](data);
  };

  return {
    addSuccessToast: getToast('success'),
    addErrorToast: getToast('error'),
    addInfoToast: getToast('info'),
    addWarningToast: getToast('warning'),
  };
};
