import { PropsWithChildren, useEffect } from 'react';
import { useSessionStore } from '@entities/session';
import { Spinner } from '@shared/ui/spinner';
import { useGetSession } from '@/entities/auth';
import { useAppInterceptor } from '../useAppInterceptor';

export function AppLoader({ children }: PropsWithChildren) {
  const { isPending, mutate } = useGetSession();
  const setCurrentSession = useSessionStore(({ setCurrentSession }) => setCurrentSession);

  useAppInterceptor();

  useEffect(() => {
    mutate(undefined, {
      onSuccess: res => {
        setCurrentSession(res);
      },
    });
  }, []);

  return isPending ? <Spinner isFullScreen /> : children;
}
