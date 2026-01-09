export interface GET_USER_LOGIN {
    statusCode: number;
    success: boolean;
    message: string;
    result: {
      mobile: string;
      otp: string;
      userUniqueId: number;
    };
  }

export interface GET_OTP_VERIFY {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    mobile: string;
    userUniqueId: number;
    token: string;
    refreshToken: string;
    ExpirationTime: number;
  };
}

export interface GET_OTP_RESEND {
    statusCode: number;
    success: boolean;
    message: string;
    result: {
      mobile: string;
      otp: string;
      userUniqueId: number;
    };
  } 
  
export interface GET_SETTINGS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    setting : {
    id: number;
    codCharges: string;
    deliveryCharges: string;
    expressCharges: string;
    referalBonus: number;
    s3Url: string;
  };
  }
}  

export interface GET_REFRESH_TOKENS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
  token: string;
  refreshToken: string;
  expirationTime: number;
  user: {
  userUniqueId: number;
  mobile: string;
  displayName: string;
};
};
}
  