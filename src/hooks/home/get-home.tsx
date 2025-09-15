import homeService from '@services/home-service';
import { useQuery } from '@tanstack/react-query';

 
 function useGetHomeData() {
  return useQuery({
    queryKey: [homeService.queryKeys.getHome],
    queryFn: homeService.getHome,
  });
}

export default useGetHomeData;