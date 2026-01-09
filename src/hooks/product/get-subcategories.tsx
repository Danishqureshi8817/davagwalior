
import productService from '@services/product-service';
import { useQuery } from '@tanstack/react-query';

 
 function useGetSubcategories(data:{name:string}) {
  return useQuery({
    queryKey: [productService.queryKeys.getSubcategories + data?.name],
    queryFn: () => productService.getSubcategories(data),
  });
}

export default useGetSubcategories;