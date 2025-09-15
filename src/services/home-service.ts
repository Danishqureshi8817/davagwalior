
import { GET_HOME_DATA, GET_MAINCAT } from '../types/home/response-type';
import { fetcher } from '../utils/fetcher';
import { AxiosResponse } from 'axios';

class HomeService {
  queryKeys = {
    getHome: 'getHome',
    getMainCategory : 'getMainCategory',
    otpResend : 'otpResend',
   
  
  };
  
  getHome = async (data:any) : Promise<AxiosResponse<GET_HOME_DATA>>  => {
    return fetcher({
      url: '/home',
      method: 'GET',
    });
  }

  getMainCategory = async (data:any) : Promise<AxiosResponse<GET_MAINCAT>>  => {
    return fetcher({
      url: '/maincat',
      method: 'GET',
    });
  }


}

export default new HomeService();