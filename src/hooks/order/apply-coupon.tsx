import { useToast } from "@masumdev/rn-toast";
import orderService from "@services/order-service";
import { useMutation } from "@tanstack/react-query";

export default function useApplyCoupon() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: orderService.applyCoupon,
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to apply coupon code';
      showToast(errorMessage, 'error');
    },
  });
}
