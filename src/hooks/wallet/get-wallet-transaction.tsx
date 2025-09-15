import walletService from '@services/wallet-service';
import { useQuery } from '@tanstack/react-query';

 function useGetWalletTransactions(data: { userId : number}) {
  return useQuery({
    queryKey: [walletService.queryKeys.getWalletTransactions + data?.userId],
    queryFn: () => walletService.getWalletTransactions(data),
    enabled: !!data,
  });
}

export default useGetWalletTransactions;