import { AxiosResponse } from 'axios';

import { APPLY_COUPON_RESPONSE, CREATE_ORDER, GET_ORDER_DETAILS, GET_ORDERS } from '../types/order/response-type';
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
  shippingCharge: number;
  codCharge: number;
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

  getOrders = async (data: { userId: number, startDate?: string, status: string, endDate?: string, pageParam?: number }): Promise<AxiosResponse<GET_ORDERS>> => {
    const { userId, startDate, status, endDate, pageParam = 1 } = data

    return fetcher({
      url: `/orders/my?userId=${userId}&status=${status}&page=${pageParam}&limit=10`,
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

  applyCoupon = async (data: { couponCode: string, totalAmount: number }): Promise<AxiosResponse<APPLY_COUPON_RESPONSE>> => {
    const { couponCode, totalAmount } = data

    return fetcher({
      url: `/coupons/apply?coupon_code=${couponCode}&totalAmount=${totalAmount}`,
      method: 'POST',
    });
  }

  




}

export default new OrderService();