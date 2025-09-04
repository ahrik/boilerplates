import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Typography } from 'antd';
import { useAddTask } from '@entities/tasks';
import { RHFInput } from '@shared/RHF-controls/RHFInput';
import { FormProvider } from '@shared/RHF-controls/RHFProvider';
import { Button } from '@shared/ui/Button';
import { addTaskFormFieldsSchema, TaskFormValues } from '../schema/form';

export function AddTaskForm() {
  const { t } = useTranslation();
  const { addTask, isLoading, error } = useAddTask();

  const methods = useForm<TaskFormValues>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(addTaskFormFieldsSchema),
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const handleSignInSubmit = (formData: TaskFormValues) => {
    if (!formData.title) {
      return;
    }

    addTask({ ...formData, dueDate: formData.dueDate });
  };

  const inProgress = isLoading || isSubmitting;

  return (
    <FormProvider<TaskFormValues> methods={methods} onSubmit={handleSignInSubmit}>
      <RHFInput label="Title" name="title" disabled={inProgress} />
      <RHFInput label="Description" name="description" disabled={inProgress} />
      <RHFInput label="status" name="status" disabled={inProgress} />
      <RHFInput label="dueDate" name="dueDate" disabled={inProgress} />
      <RHFInput label="reason" name="reason" disabled={inProgress} />

      <Flex justify="center">
        <Button color="primary" variant="solid" htmlType="submit" loading={inProgress} size="large" block>
          {t('Creat Task')}
        </Button>
      </Flex>
      {error && (
        <Flex justify="center" style={{ marginTop: '24px' }}>
          <Typography.Text type="danger">{error}</Typography.Text>
        </Flex>
      )}
    </FormProvider>
  );
}
