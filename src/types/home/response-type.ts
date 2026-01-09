export interface GET_HOME_DATA {
  homeBanner: {
    homeBannerTop: {
      id: number;
      img: string;
      type: string;
      url: string;
      createdAt: string;
      section: string;
    }[];
    homeBannerBottom: {
      id: number;
      img: string;
      type: string;
      url: string;
      createdAt: string;
      section: string;
    }[];
  };
  masterCat: {
    id: number;
    name: string;
    image: string;
  }[];
  mainCat: {
    id: number;
    name: string;
    masterCat: string;
    image: string;
    showHome: number;
  }[];
  productsByCategory: {
    category: string;
    products: {
      sku: number;
      DisplayName: string;
      sellPrice: number;
      BuyPrice: number;
      thumbnail: string;
      brand: string;
      igst: number;
      stock: boolean;
    }[];
  }[];
}

export interface GET_MAINCAT {
  statusCode: number;
  success: boolean;
  message: string;
  result: {
    id: number;
    name: string;
    masterCat: string;
    image: string;
    showHome: number;
  }[];
}