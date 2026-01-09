export interface CREATE_ORDER {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    orderId: number;
    ordersData: {
      orderDetails: {
        id: number;
        orderId: number;
        storeId: string;
        addressId: number;
        userId: number;
        status: string;
        phone: string;
        address: string;
        deliveredAt: null;
        shipAt: null;
        packAt: null;
        returnAt: null;
        returnRecieveAt: null;
        cancelAt: null;
        createdAt: string;
        updatedAt: null;
        userName: string;
        userMobile: string;
        isPaid: boolean;
        txStatus: null;
        txTime: null;
        paidBy: string;
        paymentMod: string;
        shipMode: string;
        subTotal: number;
        couponCode: string;
        coupondiscount: number;
        total: number;
        orderAmount: number;
        shippingCharge: number;
        codCharge: number;
        waybillNo: null;
        deliveryPartner: null;
        paymentRecievedByDeliveryPartner: null;
        prescription: string;
      };
      orderId: number;
      orderItems: {
        id: number;
        orderId: number;
        productId: string;
        productName: string;
        productImg: string;
        quantity: number;
        total: number;
        itemBuyPrice: number;
        itemSellPriceCopy: number;
        createdAt: string;
      }[];
    };
  };
}

export interface GET_ORDERS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    orders: {
    id: number;
    orderId: number;
    storeId: string;
    addressId: number;
    userId: number;
    status: string;
    phone: string;
    address: string;
    deliveredAt: null;
    shipAt: null;
    packAt: null;
    returnAt: null;
    returnRecieveAt: null;
    cancelAt: null;
    createdAt: string;
    updatedAt: null;
    userName: string;
    userMobile: string;
    isPaid: boolean;
    txStatus: null;
    paidBy: string;
    paymentMod: string;
    subTotal: number;
    couponCode: null;
    coupondiscount: number;
    total: number;
    orderAmount: number;
    shippingCharge: number;
    codCharge: number;
    waybillNo: null;
    deliveryPartner: null;
    shipMode: string;
    paymentRecievedByDeliveryPartner: null;
    prescription: string;
    cancel_reason: null;
    items: {
    id: number;
    orderId: number;
    productId: string;
    productName: string;
    productImg: string;
    quantity: number;
    total: number;
    itemBuyPrice: number;
    itemSellPriceCopy: number;
    createdAt: string;
  }[];
  }[];
    pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  };
}

export interface GET_ORDER_DETAILS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    orderInfo: {
      id: number;
      orderId: number;
      storeId: string;
      addressId: number;
      userId: number;
      status: string;
      phone: string;
      address: string;
      deliveredAt: null;
      shipAt: null;
      packAt: null;
      returnAt: null;
      returnRecieveAt: null;
      cancelAt: null;
      createdAt: string;
      updatedAt: string;
      userName: string;
      userMobile: string;
      isPaid: boolean;
      txStatus: null;
      paidBy: string;
      paymentMod: string;
      subTotal: number;
      couponCode: string;
      coupondiscount: number;
      total: number;
      orderAmount: number;
      shippingCharge: number;
      codCharge: number;
      waybillNo: null;
      deliveryPartner: null;
      paymentRecievedByDeliveryPartner: null;
      prescription: string;
      txTime: null;
      orderItems: {
        id: number;
        productId: string;
        productName: string;
        quantity: number;
        itemBuyPrice: number;
        createdAt: string;
        total: number;
      }[];
      totalOrderAmount: number;
    }[];
  };
}

export interface APPLY_COUPON_RESPONSE {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
  coupon: {
  id: number;
  name: string;
  coupon_code: string;
  percent: number;
  expiry_date: string;
  created_at: string;
  min_amount: number;
  live: string;
};
  discountAmount: number;
  finalAmount: number;
};
}