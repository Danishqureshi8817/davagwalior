import { AxiosResponse } from 'axios';

import { CREATE_ORDER, GET_ORDER_DETAILS, GET_ORDERS } from '../types/order/response-type';
import { fetcher } from '../utils/fetcher';

interface CREATE_ORDER_DATA {
  userId: number;
  addressId: number;
  orderItems: {
    productId: number;
    quantity: number;
  }[];
  couponCode: string;
  prescription: string;
  shipMode: string;
  paymentMod: string;
}

class OrderService {
  queryKeys = {
    getOrders: 'getOrders',
    createOrder: 'createOrder',
    getOrderDetails : 'getOrderDetails',

  };

  createOrder = async (data: CREATE_ORDER_DATA): Promise<AxiosResponse<CREATE_ORDER>> => {
    return fetcher({
      url: '/orders',
      method: 'POST',
      data
    });
  }

  getOrders = async (data: { userId: number, startDate?: string, status: string, endDate?: string }): Promise<AxiosResponse<GET_ORDERS>> => {
    const { userId, startDate, status, endDate } = data

    return fetcher({
      url: `/orders?userId=${userId}&status=${status}`,
      method: 'GET',
    });
  }

  getOrderDetails = async (data: { orderId: number }): Promise<AxiosResponse<GET_ORDER_DETAILS>> => {
    const { orderId } = data

    return fetcher({
      url: `/orders/detail?orderId=${orderId}`,
      method: 'GET',
    });
  }




}

export default new OrderService();