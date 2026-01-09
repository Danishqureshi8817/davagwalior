export interface GET_STATES_BY_COUNTRY {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    fips_code: null | string;
    iso2: string;
    latitude: null | string;
    longitude: null | string;
    flag: boolean;
    wikiDataId: string;
  }[];
}

export interface GET_CITIES_BY_STATE {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    id: number;
    name: string;
    state_id: number;
    state_code: string;
    country_id: number;
    country_code: string;
    latitude: string;
    longitude: string;
    flag: boolean;
    wikiDataId: string;
    img: null | string;
    clinicShow: number;
    clinic_show_order_no: null | number;
  }[];
}

export interface GET_USER_ADDRESSES {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    userAddresses: {
      id: number;
      userId: number;
      userName: string;
      userMobile: string;
      Address: string;
      landmark: string;
      pincode: number;
      cityId: null;
      cityName: string;
      Country: string;
      stateId: null;
      stateName: string;
      createdAt: string;
    }[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }
    ;
  };
}

export interface ADD_USER_ADDRESS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    id: number;
    userId: number;
    userName: string;
    userMobile: null;
    Address: string;
    landmark: string;
    pincode: number;
    cityId: null;
    cityName: null;
    Country: null;
    stateId: null;
    stateName: null;
    createdAt: string;
  };
}

export interface UPDDATE_USER_ADDRESS {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    id: number;
    userId: number;
    userName: string;
    userMobile: string;
    Address: string;
    landmark: string;
    pincode: number;
    cityId: number;
    cityName: string;
    Country: string;
    stateId: number;
    stateName: string;
    createdAt: string;
  };
}

export interface DELETE_USER_ADDRESS {
  statusCode: number;
  success: boolean;
  message: string;
}


