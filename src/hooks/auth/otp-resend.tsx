import { useMutation } from "@tanstack/react-query";
import { useToast } from "@masumdev/rn-toast";
import authService from "@services/auth-service";

export default function useOtpResend() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: authService.otpResend,
    onError: (error: any) => {
      showToast('Something went wrong while OTP Resend', 'error');
    },
  });

}