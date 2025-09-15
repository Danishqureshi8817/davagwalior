import { AxiosResponse } from 'axios';
import { fetcher } from '../utils/fetcher';
import { GET_USER_PROFILE } from '../types/profile/response-type';

class ProfileService {
  queryKeys = {
    getUserProfile: 'getUserProfile',
    updateUserProfile: 'updateUserProfile',

  };

  getUserProfile = async (data: { userId: number }): Promise<AxiosResponse<GET_USER_PROFILE>> => {
    const { userId } = data
    
    return fetcher({
      url: `/auth/profile?userUniqueId=${userId}`,
      method: 'GET',
    });
  }

  updateUserProfile = async (data: { payload: any, userid: number }): Promise<AxiosResponse<GET_USER_PROFILE>> => {
    const { payload, userid } = data

    return fetcher({
      url: `/auth/profile/update/${userid}`,
      method: 'PATCH',
      data: payload
    });
  }



}

export default new ProfileService();