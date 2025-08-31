import { useNavigate } from '@tanstack/react-router';
import { useSessionStore } from '@entities/session';
import { ROUTERS } from '@shared/constants';
import { useSignOut } from '@/entities/auth';

export function useSignOutHook() {
  const navigate = useNavigate();
  const { mutate, isPending: isLoading, error } = useSignOut();
  const removeSession = useSessionStore(({ removeSession }) => removeSession);

  const signOut = async () => {
    mutate(undefined, {
      onSuccess: () => {
        removeSession();
        navigate({ to: ROUTERS.SIGN_IN });
      },
    });
  };

  return {
    error,
    isLoading,
    signOut,
  };
}
