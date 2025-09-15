import { useToast } from "@masumdev/rn-toast";
import addressService from "@services/address-service";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteUserAddress() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: addressService.deleteUserAddress,
    onSuccess: () => {
      showToast('Deleted successfully', 'success');
    },
    onError: (error: any) => {
      showToast('Something went wrong while Deleting address', 'error');   
    },
  });

}