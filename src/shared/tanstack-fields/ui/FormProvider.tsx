import { FormHTMLAttributes, ReactNode } from 'react';
import { useForm } from '@tanstack/react-form';
import { TanstackFormContext } from '../model/useTanstackFormContext';

type Props<> = {
  // TODO fix any later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: ReturnType<typeof useForm<any, any, any, any, any, any, any, any, any, any, any, any>>;
  children: ReactNode;
  formProps?: FormHTMLAttributes<HTMLFormElement>;
};

export const FormProvider = ({ form, children, formProps }: Props) => {
  return (
    <TanstackFormContext.Provider value={form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        {...formProps}
      >
        {children}
      </form>
    </TanstackFormContext.Provider>
  );
};
