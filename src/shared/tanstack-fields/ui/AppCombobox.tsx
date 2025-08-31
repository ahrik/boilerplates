import { Combobox, ComboboxRootProps, createListCollection, Field, FieldRootProps } from '@ark-ui/react';
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
  comboboxProps?: ComboboxRootProps<Option>;
  options: Option[];
  search?: string;
  setSearch: (value: string) => void;
};

export const AppCombobox = ({ name, label, fieldProps, comboboxProps, options, setSearch }: Props) => {
  const form = useTanstackFormContext();

  return (
    <form.Field
      name={name}
      children={field => {
        const showError = !field.state.meta.isValid && field.state.meta.isTouched;

        const message = showError
          ? (field.state.meta.errors as unknown as { message?: string }[]).find(item => item?.message)?.message
          : undefined;

        const collection = createListCollection({ items: options });

        return (
          <Field.Root invalid={showError && !!message} {...fieldProps}>
            <Combobox.Root
              collection={collection}
              onInputValueChange={event => setSearch(event.inputValue)}
              {...comboboxProps}
            >
              {label && (
                <Combobox.Label className="block mb-1 text-sm font-medium text-gray-700">{label}</Combobox.Label>
              )}
              <Combobox.Control className="relative w-64 flex">
                <Combobox.Input className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Combobox.Trigger>
                  <ChevronDownIcon className="h-10 w-10 text-gray-500" />
                </Combobox.Trigger>
                <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
              </Combobox.Control>
              <Combobox.Positioner>
                <Combobox.Content className="mt-1 max-h-60 w-64 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                  {collection.items.map(item => (
                    <Combobox.Item
                      key={item.value}
                      item={item}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 data-[highlighted]:bg-blue-50"
                    >
                      <Combobox.ItemText>{item.label}</Combobox.ItemText>
                      <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                    </Combobox.Item>
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>
            </Combobox.Root>
            <Field.ErrorText className="text-red-500">{message}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};
