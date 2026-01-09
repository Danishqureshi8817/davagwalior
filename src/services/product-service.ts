import { fetcher } from '@utils/fetcher';
import { GET_OTP_RESEND, GET_OTP_VERIFY, GET_SETTINGS, GET_USER_LOGIN } from '../types/auth/response-type';
import { AxiosResponse } from 'axios';
import { GET_PRODUCTS_LIST, GET_SEARCH_PRODUCTS, GET_SUBCATEGORY, GET_PRODUCT_DETAILS } from '../types/product/response-type';

class ProductService {
  queryKeys = {
    getSubcategories: 'getSubcategories',
    getProductsList: 'getProductsList',
    searchProducts: 'searchProducts',
    getProductDetails: 'getProductDetails',
  };
  
  getSubcategories = async (data:{name:string}): Promise<AxiosResponse<GET_SUBCATEGORY>>  => {
    return fetcher({
      url: `/fetchsubcategory?name=${data?.name}`,
    });
  }

  getProductsList = async (data:{mainCat:string,masterCat:string,subCat:string,sortBy?:string,limit?:number,pageParam:number}): Promise<AxiosResponse<GET_PRODUCTS_LIST>>  => {
    const sortByParam = data?.sortBy ? `&sortBy=${data.sortBy}` : '';
    return fetcher({
      url: `/products?mainCat=${data?.mainCat}&masterCat=${data?.masterCat}&subCat=${data?.subCat}${sortByParam}&page=${data?.pageParam}&limit=10`,
    });
  }

  searchProducts = async (data:{DisplayName:string}): Promise<AxiosResponse<GET_SEARCH_PRODUCTS>>  => {
    return fetcher({
      url: `/products?DisplayName=${encodeURIComponent(data?.DisplayName)}`,
    });
  }

  getProductDetails = async (data:{sku: number}): Promise<AxiosResponse<GET_PRODUCT_DETAILS>> => {

    console.log(data?.sku,'api cll');
    
    return fetcher({
      url: `/products/detail/${data?.sku}`,
    });
  }

}

export default new ProductService();