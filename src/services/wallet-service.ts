import { AxiosResponse } from 'axios';

import { GET_WALLET_TRANSACTIONS } from '../types/wallet/response-type';
import { fetcher } from '../utils/fetcher';

class WalletService {
  queryKeys = {
    getWalletTransactions: 'getWalletTransactions',
  };

  getWalletTransactions = async (data: {userId : number, pageParam?: number}): Promise<AxiosResponse<GET_WALLET_TRANSACTIONS>> => {
    const { userId, pageParam = 1 } = data

    return fetcher({
      url: `/wallet-Txn?userId=${userId}&page=${pageParam}&limit=10`,
      method: 'GET',
    });
  }



}

export default new WalletService();