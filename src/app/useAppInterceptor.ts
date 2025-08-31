import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { apiInstance } from '@/shared/api/api-instance';
import { ROUTERS } from '@/shared/constants';

export function useAppInterceptor() {
  const navigation = useNavigate();

  useEffect(() => {
    apiInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 403) {
          navigation({ to: ROUTERS.FORBIDDEN, replace: true });
        }
        if (error.response.status === 401) {
          navigation({ to: ROUTERS.SIGN_IN, replace: true });
        }
        throw error;
      }
    );
  }, []);
}
