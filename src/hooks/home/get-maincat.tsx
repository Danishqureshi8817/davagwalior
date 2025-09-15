import { useQuery } from '@tanstack/react-query';
import homeService from '../../services/home-service';
 
 function useGetMainCategory() {
  return useQuery({
    queryKey: [homeService.queryKeys.getMainCategory],
    queryFn: homeService.getMainCategory,
  });
}

export default useGetMainCategory;