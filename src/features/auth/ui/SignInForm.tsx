import { useTranslation } from 'react-i18next';
import { Button } from '@headlessui/react';
import { AppInput } from '@/shared/tanstack-fields/ui/AppInput';
import { FormProvider } from '@/shared/tanstack-fields/ui/FormProvider';
import { useSignInHook } from '../model/useSignIn';

type Props = {
  className?: string;
};

export function SignInForm({ className }: Props) {
  const { t } = useTranslation();
  const { form, inProgress, error } = useSignInHook();

  return (
    <FormProvider form={form} formProps={{ className }}>
      <AppInput
        name="email"
        label="Email"
        inputProps={{ type: 'email', placeholder: 'example@ex.com' }}
        fieldProps={{ disabled: inProgress }}
      />
      <AppInput
        label={t('password-label')}
        name="password"
        inputProps={{ type: 'password', placeholder: '****' }}
        fieldProps={{ disabled: inProgress }}
      />
      <Button disabled={inProgress} type="submit">
        {t('enter')}
      </Button>
      {error && <p>{t('sign-in-error')}</p>}
    </FormProvider>
  );
}
