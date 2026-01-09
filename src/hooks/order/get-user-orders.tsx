import orderService from '@services/order-service';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetUserOrders(data: { userId: number, startDate?: string, status: string, endDate?: string }) {
  return useInfiniteQuery({
    queryKey: [orderService.queryKeys.getOrders + data?.userId + data?.startDate + data?.status + data?.endDate],
    queryFn: ({ pageParam = 1 }: any) => orderService.getOrders({
      userId: data.userId,
      startDate: data.startDate,
      status: data.status,
      endDate: data.endDate,
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
    gcTime: 0,
  });
}

export default useGetUserOrders;