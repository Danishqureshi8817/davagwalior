import addressService from '@services/address-service';
import { useInfiniteQuery } from '@tanstack/react-query';
 
function useGetUserAddresses(data:{ userId : number}) {
  return useInfiniteQuery({
    queryKey: [addressService.queryKeys.getUserAddresses + data?.userId],
    queryFn: ({ pageParam = 1 }: any) => addressService.getUserAddresses({
      userId: data.userId,
      pageParam: pageParam ?? 1,
    }),
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage?.data?.result?.pagination?.page < lastPage?.data?.result?.pagination?.totalPages) {
        return lastPage?.data?.result?.pagination?.page + 1;
      }
      return null;
    },
    initialPageParam: 1,
    enabled: !!data?.userId,
  });
}

export default useGetUserAddresses