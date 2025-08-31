import { Field, FieldRootProps, FieldTextareaProps } from '@ark-ui/react';
import { useTanstackFormContext } from '../model/useTanstackFormContext';

type Props = {
  name: string;
  label?: string;
  fieldProps?: FieldRootProps;
  textareaProps?: FieldTextareaProps;
};

export const AppTextarea = ({ name, label, fieldProps, textareaProps }: Props) => {
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
          <Field.Root invalid={showError && !!message} className="flex flex-col gap-1" {...fieldProps}>
            {label && <Field.Label>{label}</Field.Label>}
            <Field.Textarea
              value={field.state.value as string}
              onChange={event => field.handleChange(event.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...textareaProps}
            />
            <Field.ErrorText className="text-red-500">{message}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};
