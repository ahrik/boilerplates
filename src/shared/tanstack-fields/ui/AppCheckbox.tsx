import { Checkbox, CheckboxRootProps, Field, FieldRootProps } from '@ark-ui/react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { useTanstackFormContext } from '../model/useTanstackFormContext';

type Props = {
  name: string;
  label?: string;
  checkboxProps?: CheckboxRootProps;
  fieldProps?: FieldRootProps;
};

export const AppCheckbox = ({ name, label, checkboxProps, fieldProps }: Props) => {
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
          <Field.Root invalid={showError && !!message} {...fieldProps}>
            <Checkbox.Root
              checked={field.state.value as boolean}
              onCheckedChange={e => field.handleChange(e.checked)}
              className="flex items-center gap-2"
              {...checkboxProps}
            >
              <Checkbox.Control className="h-5 w-5 rounded-md border border-gray-400 data-[state=checked]:border-blue-600 flex items-center justify-center transition-colors">
                <Checkbox.Indicator className="text-white text-sm">
                  <CheckIcon className="w-4 h-4 text-blue-600" />
                </Checkbox.Indicator>
                <Checkbox.Indicator indeterminate className="text-white text-sm">
                  <MinusIcon />
                </Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.HiddenInput />
              {label && <Checkbox.Label className="text-gray-800">{label}</Checkbox.Label>}
            </Checkbox.Root>
            <Field.ErrorText className="text-red-500">{message}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};
