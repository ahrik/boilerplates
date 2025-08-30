import { useMutation } from '@tanstack/react-query';
import { SignIn, signIn } from '@/shared/api/generated_api';
import { SIGN_IN_MUTATION_KEY } from '../constants';

export const useSignIn = () => {
  return useMutation({
    mutationKey: [SIGN_IN_MUTATION_KEY],
    mutationFn: (data: SignIn) => signIn(data),
  });
};
