import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { loadSession } from '@entities/session';
import { ROUTERS } from '@shared/constants';
import { Spinner } from '@shared/ui/spinner';
import { useAppInterceptor } from '../useAppInterceptor';

export function AppLoader({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useAppInterceptor();

  const loading = async () => {
    try {
      await loadSession();
    } catch (error: unknown | Error) {
      console.error(error);
      navigate({ to: ROUTERS.SIGN_IN });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loading();
  }, []);

  return isLoading ? <Spinner isFullScreen /> : children;
}
