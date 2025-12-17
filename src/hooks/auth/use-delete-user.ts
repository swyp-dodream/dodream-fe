import { useMutation } from '@tanstack/react-query';
import { clientApis } from '@/services/client.api';
import { logout } from '@/utils/auth.util';

export default function useDeleteUser() {
  return useMutation({
    mutationFn: () => clientApis.user.deleteUser(),
    onSuccess: () => {
      logout();
    },
  });
}
