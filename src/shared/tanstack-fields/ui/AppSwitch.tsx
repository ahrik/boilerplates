import { Field, FieldRootProps, Switch, SwitchRootProps } from '@ark-ui/react';
import { useTanstackFormContext } from '../model/useTanstackFormContext';

type Props = {
  name: string;
  label?: string;
  switchProps?: SwitchRootProps;
  fieldProps?: FieldRootProps;
};

export const AppSwitch = ({ name, label, fieldProps, switchProps }: Props) => {
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
            <Switch.Root
              checked={field.state.value as boolean}
              onCheckedChange={e => field.handleChange(e.checked)}
              className="flex items-center gap-3"
              {...switchProps}
            >
              <Switch.Control className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 data-[state=checked]:bg-blue-600 transition-colors">
                <Switch.Thumb className="h-5 w-5 rounded-full bg-white shadow transform transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1" />
              </Switch.Control>
              {label && <Switch.Label className="text-gray-800">{label}</Switch.Label>}
              <Switch.HiddenInput />
            </Switch.Root>
            {<Field.ErrorText className="text-red-500">{message}</Field.ErrorText>}
          </Field.Root>
        );
      }}
    />
  );
};
