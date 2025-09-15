export interface GET_WALLET_TRANSACTIONS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    id: number;
    userId: number;
    userName: string;
    amount: number;
    type: string;
    description: string;
    createdAt: string;
    source: string;
  }[];
}