export interface GET_USER_PROFILE {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    id: number;
    displayName: string;
    createdAt: string;
    updatedAt: string;
    userReferalCode: null;
    userUniqueId: number;
    wallet: number;
    country: string;
    email: string;
    mobile: string;
    avatarUrl: null;
  };
}
  