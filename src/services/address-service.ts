import { AxiosResponse } from 'axios';

import { ADD_USER_ADDRESS, DELETE_USER_ADDRESS, GET_CITIES_BY_STATE, GET_STATES_BY_COUNTRY, GET_USER_ADDRESSES, UPDDATE_USER_ADDRESS } from '../types/address/response-type';
import { fetcher } from '../utils/fetcher';

class AddressService {
  queryKeys = {
    statesByCountry: 'statesByCountry',
    getCitiesByState: 'getCitiesByState',
    getUserAddresses: 'getUserAddresses',
    updateUserAddress: 'updateUserAddress',

  };


  getUserAddresses = async (data: { userId: number }): Promise<AxiosResponse<GET_USER_ADDRESSES>> => {
    const { userId } = data
    return fetcher({
      url: `/user-address/${userId}`,
      method: 'GET',
    });
  }

  addUserAddress = async (data: { userId: number, payload: any }): Promise<AxiosResponse<ADD_USER_ADDRESS>> => {
    const { userId, payload } = data
    return fetcher({
      url: `/user-address/${userId}`,
      method: 'POST',
      data: payload
    });
  }

  updateUserAddress = async (data: { userId: number, addressId: number, payload: any }): Promise<AxiosResponse<UPDDATE_USER_ADDRESS>> => {
    const { userId, addressId, payload } = data
    console.log(data);

    return fetcher({
      url: `/user-address/${userId}/${addressId}`,
      method: 'PUT',
      data: payload
    });
  }

  deleteUserAddress = async (data: { userId: number, addressId: number}): Promise<AxiosResponse<DELETE_USER_ADDRESS>> => {
    const { userId, addressId, } = data

    return fetcher({
      url: `/user-address/${userId}/${addressId}`,
      method: 'DELETE',
    });
  }


  statesByCountry = async (data: any): Promise<AxiosResponse<GET_STATES_BY_COUNTRY>> => {
    return fetcher({
      url: `states/country/${data}`,
      method: 'GET',
      data
    });
  }

  getCitiesByState = async (data: any): Promise<AxiosResponse<GET_CITIES_BY_STATE>> => {
    return fetcher({
      url: `/cities/state/${data}`,
      method: 'GET',
      data
    });
  }



}

export default new AddressService();