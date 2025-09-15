import { useMutation } from "@tanstack/react-query";
import { useToast } from "@masumdev/rn-toast";
import addressService from "@services/address-service";


export default function useUpdateUserAddress() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: addressService.updateUserAddress,
    onSuccess : () => {
      showToast('Updated successfully', 'success');
    },
    onError: (error: any) => {
      showToast('Something went wrong while updating address', 'error');
    },
  });

}