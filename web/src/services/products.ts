import { http } from './http';
import { Product, ProductUpdateRequest } from '../model/product';
import { AxiosError } from 'axios';

export const httpGetProducts = (userId?: number) => http.get<Product[]>(`/products`, {
  params: {
    userId,
  },
}).then(({data}) => data)


export const httpDeleteProducts = (productId: number) => http.delete<Product[] | AxiosError>(`/products/${productId}`)
  .then(({data}) => data).catch(({response}) => {
    throw response.data;
  })

export const httpUpdateProducts = (productId: number, updateRequest: ProductUpdateRequest) => http.put<Product>(`/products/${productId}`, updateRequest)
  .then(({data}) => data);

export const httpAddProducts = (updateRequest: ProductUpdateRequest) => http.post<Product>('/products', updateRequest)
  .then(({data}) => data);
