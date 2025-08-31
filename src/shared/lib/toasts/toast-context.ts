import { createContext } from 'react';
import { createToaster } from '@ark-ui/react';

export const ToastContext = createContext<ReturnType<typeof createToaster> | null>(null);
