import { useMutation } from "@tanstack/react-query";
import { useToast } from "@masumdev/rn-toast";
import addressService from "@services/address-service";


export default function useAddUserAddress() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: addressService.addUserAddress,
    onSuccess: () => {
      showToast('Added successfully', 'success');
    },
    onError: (error: any) => {
      showToast('Something went wrong while add new address<', 'error');
    },
  });

}