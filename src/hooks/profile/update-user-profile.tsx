import { useToast } from "@masumdev/rn-toast";
import profileService from "@services/profile-service";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateUserProfile() {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: profileService.updateUserProfile,
    onSuccess: () => {
      showToast('Updated successfully', 'success');
    },
    onError: (error: any) => {
      showToast('Something went wrong while Updating', 'error');
    },
  });

}