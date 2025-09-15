import addressService from '@services/address-service';
import { useQuery } from '@tanstack/react-query';
 
 function useGetUserAddresses(data:{ userId : number}) {
  return useQuery({
    queryKey: [addressService.queryKeys.getUserAddresses + data?.userId],
    queryFn: () => addressService.getUserAddresses(data),
    enabled: !!data,
  });
}

export default useGetUserAddresses