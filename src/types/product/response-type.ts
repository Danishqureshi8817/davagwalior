export interface GET_SUBCATEGORY {
    statusCode: number;
    success: boolean;
    message: string;
    result: {
    subCats: {
    id: number;
    name: string;
    masterCat: string;
    mainCat: string;
    image: string;
  }[];
  };
  }

  export interface GET_PRODUCTS_LIST {
    statusCode: number;
    success: boolean;
    message: string;
    result: {
    products: {
    id: number;
    storeId: string;
    sku: number;
    stock: boolean;
    name: string;
    DisplayName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    masterCat: string;
    mainCat: string;
    subCat: string;
    BuyPrice: number;
    sellPrice: number;
    thumbnail: string;
    brand: string;
    metaTitle: string;
    metaDes: string;
    drug: string;
    usage: string;
    packagingType: string;
    oum: string;
    hsnCode: string;
    igst: number;
    package_qty: number;
    oum_qty: number;
  }[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    totalactiveproduct: number;
    totaldisactiveproduct: number;
  };
  }

  export interface GET_SEARCH_PRODUCTS {
    statusCode: number;
    success: boolean;
    message: string;
    result: {
      products: {
        id: number;
        storeId: string;
        sku: number;
        stock: boolean;
        name: string;
        DisplayName: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        masterCat: string;
        mainCat: string;
        subCat: string;
        BuyPrice: number;
        sellPrice: number;
        thumbnail: string;
        brand: string;
        metaTitle: string;
        metaDes: string;
        drug: string;
        usage: string;
        packagingType: string;
        oum: string;
        hsnCode: string;
        igst: number;
        package_qty: number;
        oum_qty: number;
      }[];
      totalRecords: number;
      totalPages: number;
      currentPage: number;
      totalactiveproduct: number;
      totaldisactiveproduct: number;
    };
  }

  export interface GET_PRODUCT_DETAILS {
    statusCode: number;
    success: boolean;
    message: string;
    result: {
    id: number;
    storeId: string;
    sku: number;
    stock: boolean;
    name: string;
    DisplayName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    masterCat: string;
    mainCat: string;
    subCat: string;
    BuyPrice: number;
    sellPrice: number;
    thumbnail: string;
    brand: string;
    metaTitle: string;
    metaDes: string;
    buyers: null;
    isArchived: boolean;
    drug: string;
    hsnCode: string;
    igst: number;
    oum: string;
    oum_qty: number;
    packagingType: string;
    usage: string;
    package_qty: number;
    genericProductIds: null;
    similarProductIds: null;
    gallery: any[];
    pricing: {
    buyPrice: number;
    sellPrice: number;
    igst: number;
  };
  };
  }