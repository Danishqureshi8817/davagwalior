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
    products: {
      'Baby-Care': any[];
      Ayurveda: {
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
      }[];
      'Homeo-Pathy': any[];
      'Persona-Care': any[];
      'Supple-ment': any[];
      'Elder-Care': any[];
      OTC: any[];
      'Pet-Care': any[];
      'Juices&Drinks': any[];
      'Pain-Relief': any[];
      Women: any[];
      Dietary: any[];
      'Herbal-Supplements': any[];
      'Power-Plus': any[];
    };
    topDealProducts: {
      discount: number;
      products: any[];
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