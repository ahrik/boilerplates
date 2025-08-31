import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { SIGN_OUT_MUTATION_KEY } from '../constants';

export const useSignOut = () => {
  return useMutation({
    mutationKey: [SIGN_OUT_MUTATION_KEY],
    mutationFn: api.signOut,
  });
};
