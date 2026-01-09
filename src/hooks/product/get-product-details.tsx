import productService from '@services/product-service';
import { useQuery } from '@tanstack/react-query';

function useGetProductDetails(data: { sku: number }) {

  console.log(data?.sku,'data');
  return useQuery({
    queryKey: [productService.queryKeys.getProductDetails + data?.sku],
    queryFn: () => productService.getProductDetails(data),
    enabled: !!data?.sku,
  });
}

export default useGetProductDetails;
