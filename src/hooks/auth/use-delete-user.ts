import { useMutation } from '@tanstack/react-query';
import userApi from '@/services/user.api';
import { logout } from '@/utils/auth.util';

export default function useDeleteUser() {
  return useMutation({
    mutationFn: () => userApi.deleteUser(),
    onSuccess: () => {
      logout();
    },
  });
}
