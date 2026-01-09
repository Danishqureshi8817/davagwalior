import { useMutation } from "@tanstack/react-query";
import { useToast } from "@masumdev/rn-toast";
import authService from "@services/auth-service";

export default function useRefreshToken() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: authService.refreshTokens,
    onError: (error: any) => {
      showToast('Something went wrong while Refreshing Token', 'error');
    },
  });

}