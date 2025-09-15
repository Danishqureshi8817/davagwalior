import authService from '@services/auth-service';
import { useQuery } from '@tanstack/react-query';
 
 function useGetSettings() {
  return useQuery({
    queryKey: [authService.queryKeys.getSettings],
    queryFn: authService.getSettings,
  });
}

export default useGetSettings;