import { useTranslation } from 'react-i18next';
import { useForm, useStore } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useSessionStore } from '@entities/session';
import { ROUTERS } from '@shared/constants';
import { useToast } from '@shared/lib/toasts';
import { useSignIn } from '@/entities/auth';
import { SignIn } from '../types';
import { SingInFormFieldsSchema } from './schema';

export const useSignInHook = () => {
  const navigate = useNavigate();
  const { addSuccessToast } = useToast();
  const { t } = useTranslation();
  const setCurrentSession = useSessionStore(({ setCurrentSession }) => setCurrentSession);

  const { mutate, isPending, error } = useSignIn();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: SingInFormFieldsSchema,
      onSubmit: SingInFormFieldsSchema,
    },
    onSubmit: data => {
      signIn(data.value);
    },
  });

  const isSubmitting = useStore(form.store, state => state.isSubmitting);

  const inProgress = isPending || isSubmitting;

  const signIn = (signInParams: SignIn) => {
    mutate(signInParams, {
      onSuccess: session => {
        setCurrentSession(session);
        addSuccessToast(t('sign-in'));
        navigate({ to: ROUTERS.ROOT });
      },
    });
  };

  return {
    error,
    isPending,
    signIn,
    inProgress,
    form,
  };
};
