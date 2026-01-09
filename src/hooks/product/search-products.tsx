import productService from '@services/product-service';
import { useQuery } from '@tanstack/react-query';

function useSearchProducts(data: {DisplayName: string}) {
  return useQuery({
    queryKey: [productService.queryKeys.searchProducts, data?.DisplayName],
    queryFn: () => productService.searchProducts({
      DisplayName: data?.DisplayName,
    }),
    enabled: !!data?.DisplayName && data?.DisplayName?.length > 0,
  })
}

export default useSearchProducts;
