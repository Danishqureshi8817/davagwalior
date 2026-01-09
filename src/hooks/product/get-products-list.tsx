import productService from '@services/product-service';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetProductsList(data: {mainCat:string,masterCat:string,subCat:string,sortBy?:string}) {
  const PAGE_LIMIT = 20; // Initialize page number using useRef

  return useInfiniteQuery({
    queryKey: [productService.queryKeys.getProductsList + data?.mainCat + data?.masterCat + data?.subCat + data?.sortBy],
    queryFn: ({ pageParam = 1 }: any) => productService.getProductsList({
      pageParam: pageParam ?? 1,
      ...data,
    }),
    getNextPageParam: (lastPage: any, pages) => {

      if (lastPage?.data?.result?.currentPage < lastPage?.data?.result?.totalPages) {

        return lastPage?.data?.result?.currentPage + 1;
      }
      return null;

    },
    initialPageParam: 1,
    enabled: !!data.mainCat && !!data.subCat,
  })

}

export default useGetProductsList;