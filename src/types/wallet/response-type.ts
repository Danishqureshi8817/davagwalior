export interface GET_WALLET_TRANSACTIONS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
  wallettxn: {
  id: number;
  userId: number;
  userName: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
  source: string;
}[];
  pagination: {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
};
}