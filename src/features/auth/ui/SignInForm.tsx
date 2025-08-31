import { useTranslation } from 'react-i18next';
import { Button } from '@shared/ui/Button';
import { AppInput, FormProvider } from '@/shared/tanstack-fields';
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
        inputProps={{ type: 'password', placeholder: '****', autoComplete: 'current-password' }}
        fieldProps={{ disabled: inProgress }}
      />
      <div className="flex justify-center mt-3">
        <Button disabled={inProgress} type="submit" loading={inProgress}>
          {t('enter')}
        </Button>
      </div>

      {error && <p className="text-red-500">{t('sign-in-error')}</p>}
    </FormProvider>
  );
}
