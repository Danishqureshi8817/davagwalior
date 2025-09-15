import orderService from '@services/order-service';
import { useQuery } from '@tanstack/react-query';

function useGetUserOrderDetails(data: { orderId: number }) {
  return useQuery({
    queryKey: [orderService.queryKeys.getOrderDetails + data?.orderId],
    queryFn: () => orderService.getOrderDetails(data),
    enabled: !!data?.orderId,
  });
}

export default useGetUserOrderDetails;