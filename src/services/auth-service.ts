import { fetcher } from '@utils/fetcher';
import { GET_OTP_RESEND, GET_OTP_VERIFY, GET_SETTINGS, GET_USER_LOGIN } from '../types/auth/response-type';
import { AxiosResponse } from 'axios';

class AuthService {
  queryKeys = {
    userLogin: 'userLogin',
    otpVerifing : 'otpVerifing',
    otpResend : 'otpResend',
    getSettings : 'getSettings',
   
  };
  
  userLogin = async (data:{mobile:number,referCode?:string,countryCode?:string,appFcmToken?:string,deviceInfo?:string}): Promise<AxiosResponse<GET_USER_LOGIN>>  => {
    return fetcher({
      url: '/auth/login',
      method: 'POST',
      data
    });
  }

  otpVerifing = async (data:{mobile:number,otp:number}): Promise<AxiosResponse<GET_OTP_VERIFY>>  => {
    return fetcher({
      url: '/auth/verify-otp',
      method: 'POST',
      data
    });
  }

  otpResend = async (data:{mobile:number}): Promise<AxiosResponse<GET_OTP_RESEND>>  => {
    return fetcher({
      url: '/auth/resend-otp',
      method: 'POST',
      data
    });
  }

  getSettings = async ( ): Promise<AxiosResponse<GET_SETTINGS>>  => {
    return fetcher({
      url: '/setting',
      method: 'GET',
    });
  }

}

export default new AuthService();