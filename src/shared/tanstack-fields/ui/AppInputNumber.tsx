import { Field, FieldRootProps, NumberInput, NumberInputInputProps } from '@ark-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTanstackFormContext } from '../model/useTanstackFormContext';

type Props = {
  name: string;
  label?: string;
  fieldProps?: FieldRootProps;
  inputProps?: NumberInputInputProps;
};

export const AppInputNumber = ({ name, label, fieldProps, inputProps }: Props) => {
  const form = useTanstackFormContext();

  return (
    <form.Field
      name={name}
      children={field => {
        const showError = !field.state.meta.isValid && field.state.meta.isTouched;

        const message = showError
          ? (field.state.meta.errors as unknown as { message?: string }[]).find(item => item?.message)?.message
          : undefined;

        console.log(showError, message);

        return (
          <Field.Root invalid={showError && !!message} className="flex flex-col gap-1" {...fieldProps}>
            <NumberInput.Root
              value={field.state.value as string}
              onValueChange={event => field.handleChange(event.value)}
            >
              {label && <NumberInput.Label>{label}</NumberInput.Label>}
              <NumberInput.Input
                className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
                {...inputProps}
              />
              <NumberInput.Control>
                <NumberInput.DecrementTrigger>
                  <ChevronDownIcon className="w-6 v-6" />
                </NumberInput.DecrementTrigger>
                <NumberInput.IncrementTrigger>
                  <ChevronUpIcon className="w-6 v-6" />
                </NumberInput.IncrementTrigger>
              </NumberInput.Control>
            </NumberInput.Root>
            <Field.ErrorText className="text-red-500">{message}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};
