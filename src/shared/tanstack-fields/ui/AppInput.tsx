import { Field, FieldProps, Input, InputProps, Label } from '@headlessui/react';
import { useTanstackFormContext } from '../model/useTanstackFormContext';

type Props = {
  name: string;
  label?: string;
  fieldProps?: FieldProps;
  inputProps?: InputProps;
};

export const AppInput = ({ name, label, fieldProps, inputProps }: Props) => {
  const form = useTanstackFormContext();

  return (
    <form.Field
      name={name}
      children={field => {
        const showError = !field.state.meta.isValid && field.state.meta.isTouched;

        const message = showError
          ? (field.state.meta.errors as unknown as { message?: string }[]).find(item => item?.message)?.message
          : undefined;

        return (
          <Field {...fieldProps}>
            {label && <Label>{label}</Label>}
            <Input
              value={field.state.value as string}
              onChange={e => field.handleChange(e.target.value)}
              {...inputProps}
            />

            {showError && message && <p>{message}</p>}
          </Field>
        );
      }}
    />
  );
};
