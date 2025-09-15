import orderService from '@services/order-service';
import { useQuery } from '@tanstack/react-query';

function useGetUserOrders(data: { userId: number, startDate?: string, status: string, endDate?: string }) {
  return useQuery({
    queryKey: [orderService.queryKeys.getOrders + data?.userId + data?.startDate + data?.status + data?.endDate],
    queryFn: () => orderService.getOrders(data),
    enabled: !!data?.userId,
    gcTime : 0
  });
}

export default useGetUserOrders;