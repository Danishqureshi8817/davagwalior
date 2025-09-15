import { useMutation } from "@tanstack/react-query";
import { useToast } from "@masumdev/rn-toast";
import authService from "@services/auth-service";

export default function useUserLogin() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: authService.userLogin,
    onError: (error: any) => {
      showToast('Something went wrong while Login', 'error');
    },
  });

}