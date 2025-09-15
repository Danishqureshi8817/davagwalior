import profileService from '@services/profile-service';
import { useQuery } from '@tanstack/react-query';

 function useGetUserProfile(data: { userId : number}) {
  return useQuery({
    queryKey: [profileService.queryKeys.getUserProfile + data?.userId],
    queryFn: () => profileService.getUserProfile(data),
    enabled: !!data,
  });
}

export default useGetUserProfile;