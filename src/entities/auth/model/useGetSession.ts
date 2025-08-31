import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { GET_SESSION_KEY } from '../constants';

export const useGetSession = () => {
  return useMutation({
    mutationKey: [GET_SESSION_KEY],
    mutationFn: api.getSession,
  });
};
