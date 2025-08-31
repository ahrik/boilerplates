import { createListCollection, Field, FieldRootProps, Select, SelectRootProps } from '@ark-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import { useTanstackFormContext } from '../model/useTanstackFormContext';

type Option = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
};

type Props = {
  name: string;
  label?: string;
  fieldProps?: FieldRootProps;
  selectProps?: SelectRootProps<Option>;
  options: Option[];
};

export const AppSelect = ({ name, label, fieldProps, selectProps, options }: Props) => {
  const form = useTanstackFormContext();

  return (
    <form.Field
      name={name}
      children={field => {
        const collection = createListCollection({ items: options });
        const showError = !field.state.meta.isValid && field.state.meta.isTouched;

        const message = showError
          ? (field.state.meta.errors as unknown as { message?: string }[]).find(item => item?.message)?.message
          : undefined;

        return (
          <Field.Root invalid={showError && !!message} {...fieldProps}>
            <Select.Root collection={collection} {...selectProps}>
              {label && <Select.Label className="text-gray-800">{label}</Select.Label>}
              <Select.Control className="w-64 flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Select.Trigger className="flex justify-between">
                  <Select.ValueText placeholder="Select a ..." />
                  <Select.Indicator>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  </Select.Indicator>
                </Select.Trigger>
                <Select.ClearTrigger>Clear</Select.ClearTrigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content className="mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
                  {collection.items.map(item => (
                    <Select.Item
                      key={item.value}
                      item={item}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex"
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
              <Select.HiddenSelect />
            </Select.Root>
            {<Field.ErrorText className="text-red-500">{message}</Field.ErrorText>}
          </Field.Root>
        );
      }}
    />
  );
};
