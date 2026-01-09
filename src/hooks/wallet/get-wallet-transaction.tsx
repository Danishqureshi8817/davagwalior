import walletService from '@services/wallet-service';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetWalletTransactions(data: { userId : number}) {
  return useInfiniteQuery({
    queryKey: [walletService.queryKeys.getWalletTransactions + data?.userId],
    queryFn: ({ pageParam = 1 }: any) => walletService.getWalletTransactions({
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

export default useGetWalletTransactions;