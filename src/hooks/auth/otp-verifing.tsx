import { useMutation } from "@tanstack/react-query";
import { useToast } from "@masumdev/rn-toast";
import authService from "@services/auth-service";

export default function useOtpVerifing() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: authService.otpVerifing,
    onError: (error: any) => {
      showToast('Something went wrong while OTP Verifing', 'error');
    },
  });

}