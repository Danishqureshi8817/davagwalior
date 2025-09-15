import { useToast } from "@masumdev/rn-toast";
import orderService from "@services/order-service";
import { useMutation } from "@tanstack/react-query";



export default function useCreateOrder() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: orderService.createOrder,
    onError: (error: any) => {
      showToast('Something went wrong while Order create', 'error');
    },
  });

}