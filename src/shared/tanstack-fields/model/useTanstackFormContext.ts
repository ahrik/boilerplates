import { createContext, useContext } from 'react';
import { useForm } from '@tanstack/react-form';

export const TanstackFormContext = createContext<ReturnType<typeof useForm> | null>(null);

export const useTanstackFormContext = () => {
  const ctx = useContext(TanstackFormContext);
  if (!ctx) {
    throw new Error('useTanstackFormContext должен использоваться внутри <FormProvider>');
  }

  return ctx;
};
