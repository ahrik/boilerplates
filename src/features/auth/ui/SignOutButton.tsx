import { LogOutIcon } from 'lucide-react';
import { Button } from '@shared/ui/Button';
import { useSignOutHook } from '../model/useSignOut';

export function SignOutButton({ className }: { className?: string }) {
  const { signOut, isLoading } = useSignOutHook();

  return <Button loading={isLoading} className={className} onClick={signOut} icon={<LogOutIcon />} />;
}
